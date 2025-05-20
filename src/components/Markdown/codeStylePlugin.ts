import type { BytemdPlugin } from 'bytemd';
import hljs from 'highlight.js';

const copyToClipboard = (text: any) => navigator.clipboard.writeText(text)
/**
 * 自定义代码块样式插件
 * 添加Mac风格标题栏、语言标识、复制按钮和行号
 */
export default function code(): BytemdPlugin {
  return {
    viewerEffect({ markdownBody }): void | (() => void) {
      const codes = markdownBody.querySelectorAll('pre > code')
      codes.forEach((code, key) => {
        let className: string = code.className
        let lan = className.replace('language-', '').toLowerCase()
        const parentNode: any = code.parentNode
        parentNode.removeChild(code)
        const fatherBox = document.createElement('div')
        // 获取代码内容并添加行号
        const codeContent = code.innerHTML;
        const lines = codeContent.split('\n');
        let codeWithLines = '';
        
        // 为每行添加行号包装
        // lines.forEach((line, index) => {
        //   // 使用data-line属性标记行号，便于样式化
        //   console.log(line)
        //   codeWithLines += `<span class="code-block-extension-codeLine" data-line="${index + 1}">${line || ' '}</span>`+'\n';
        // });
        
        fatherBox.innerHTML =
          '<div class="code-header"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg>'+
          '<div class="code-action"><span class="code-btn-copy" id="code-btn-copy-' +
          key +
          '">Copy</span><span class="code-lang">' +
          lan +
          '</span></div></div><div class="code-block"><code id="code-content-' +
          key +
          '" class="code-content- ' +
          code.className +
          '" style="font-family:\'Source Code Pro\'"' +
          '>' +
          code.innerHTML +
          '</code></div>'
        parentNode.appendChild(fatherBox)
        let btn: any = document.getElementById('code-btn-copy-' + key)
        btn.addEventListener('click', () => {
          // 复制原始代码内容，而不是带行号的HTML
          copyToClipboard(code.textContent || '')
          btn.innerHTML = 'Copied'
        })
        document.querySelectorAll('code.code-content-').forEach((el: any) => {
          hljs.highlightElement(el)
        })
      })
    },
  }
}