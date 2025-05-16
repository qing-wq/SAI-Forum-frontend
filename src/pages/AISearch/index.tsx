import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MiddleViewVertical from '@/layouts/MiddleViewVertical';

interface SearchResult {
  id: number;
  title: string;
  sort: number | null;
  createTime: string;
}

interface ApiResponse {
  status: {
    code: number;
    msg: string;
  };
  result: SearchResult[];
}

const AISearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setErrorMessage('请输入搜索内容');
      return;
    }

    setIsSearching(true);
    setErrorMessage('');
    
    try {
      // 创建AbortController来实现超时控制
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时
      
      const response = await fetch('/api/article/ai/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: searchQuery,
        }),
        signal: controller.signal,
      });

      // 清除超时定时器
      clearTimeout(timeoutId);

      const data: ApiResponse = await response.json();
      
      // 检查响应结果，根据正确的响应格式进行处理
      if (data.status && data.status.code === 200 && data.result && Array.isArray(data.result) && data.result.length > 0) {
        // 请求成功且有结果
        setSearchResults(data.result);
      } else if (data.status && data.status.code === 200 && (!data.result || !Array.isArray(data.result) || data.result.length === 0)) {
        // 请求成功但没有结果
        setSearchResults([]);
        setErrorMessage('未找到相关文章，请尝试其他关键词');
      } else {
        // 请求失败
        setErrorMessage((data.status && data.status.msg) || '搜索失败，请稍后再试');
        setSearchResults([]);
      }
    } catch (error: any) {
      console.error('AI搜索出错:', error);
      // 判断是否是超时错误
      if (error?.name === 'AbortError') {
        setErrorMessage('搜索超时，服务器响应时间过长，请稍后再试');
      } else {
        setErrorMessage('搜索失败，请稍后再试');
      }
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // 移除Enter键触发搜索的功能，只通过按钮点击触发

  const navigateToArticle = (id: number) => {
    navigate(`/article/${id}`);
  };

  return (
    <MiddleViewVertical>
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">AI智能搜索</h1>
          <p className="text-gray-600">使用自然语言描述你想要查找的文章</p>
        </div>

        <div className="flex items-center mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="例如：查找管理员在2025年5月写的关于Spring Boot的文章"
            className="input input-bordered flex-grow mr-2 py-3 px-4"
          />
          <button 
            className={`btn btn-primary px-6 ${isSearching ? 'loading' : ''}`}
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? '搜索中...' : '搜索'}
          </button>
        </div>

        {errorMessage && (
          <div className="alert alert-error mb-6">
            <div>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {searchResults.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">搜索结果</h2>
            {searchResults.map((result) => (
              <div 
                key={result.id} 
                className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigateToArticle(result.id)}
              >
                <div className="card-body">
                  <h3 className="card-title text-lg font-medium">{result.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>发布时间: {new Date(result.createTime).toLocaleString('zh-CN')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery && !isSearching && !errorMessage ? (
          <div className="text-center py-8">
            <p className="text-gray-500">未找到相关文章</p>
          </div>
        ) : null}
      </div>
    </MiddleViewVertical>
  );
};

export default AISearch;
