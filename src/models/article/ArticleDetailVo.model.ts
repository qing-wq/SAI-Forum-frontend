import TopCommentDTO from "../comment/TopCommentDTO.model";
import UserStatisticInfoDTO from "../user/UserStatisticInfoDTO.model";
import ArticleDTO from "./ArticleDTO.model";

/** 文章详情VO */
export default interface ArticleDetailVo {
	/** 文章信息 */
	article: ArticleDTO;
	/** 评论信息 */
	comments: TopCommentDTO[];
	/** 作者相关信息 */
	author: UserStatisticInfoDTO;
}
