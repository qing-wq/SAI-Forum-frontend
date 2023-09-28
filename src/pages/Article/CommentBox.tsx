import { PostCommentProp, postComment } from "@/apis/articles";
import useArticleViewStore from "@/stores/useArticleViewStore";
import useLoginStore from "@/stores/useLoginStore";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type CommentBoxProp = Pick<
	PostCommentProp,
	"parentCommentId" | "topCommentId"
> & {
	visible?: boolean;
};

export type CommentBoxHandler = {
	focus: () => void;
};
/**
 * 文章评论框
 */
const CommentBox = forwardRef<CommentBoxHandler, CommentBoxProp>(
	function CommentBox(
		{ visible = true, parentCommentId, topCommentId },
		ref
	) {
		const [comment, setComment] = useState<string>("");
		const commentTextarea = useRef<HTMLTextAreaElement>(null);
		/** 当前用户信息 */
		const userInfo = useLoginStore((state) => state.userInfo);
		/** 当前文章信息 */
		const articleInfo = useArticleViewStore((state) => state.articleInfo);
		/** 评论信息检查 */
		const getCommentInfo = () => {
			// TODO: 状态检查
			if (!userInfo || !articleInfo) {
				alert("未登录，请先登录");
				return null;
			}
			return {
				articleId: articleInfo?.articleId,
				userId: userInfo.id,
				commentContent: comment,
				parentCommentId,
				topCommentId,
			};
		};
		const navigate = useNavigate();
		/** 提交评论 */
		const submitComment = () => {
			const commentInfo = getCommentInfo();
			if (commentInfo)
				postComment(commentInfo)
					.then(() => {
						navigate(0);
					})
					.catch((err) => {
						alert("评论失败: " + err.message);
					});
		};
		/** 虚拟ref节点 */
		useImperativeHandle(ref, () => ({
			focus() {
				commentTextarea.current?.focus();
			},
		}));

		return (
			<div className={`w-full group my-2 ${visible ? "" : "hidden"}`}>
				<textarea
					ref={commentTextarea}
					value={comment}
					onChange={(e) => setComment(e.currentTarget.value)}
					className={`textarea w-full resize-none ${
						comment ? "textarea-primary" : " bg-slate-100"
					}`}
					placeholder='输入评论'
					rows={((row: number) => (row > 2 ? row : 2))(
						comment.split("\n").length
					)}
					onKeyDown={(e) => {
						if (e.ctrlKey && e.key === "Enter") submitComment();
					}}
				/>
				<div className='flex justify-between mt-1'>
					<div></div>
					<div
						className={`btn btn-active btn-sm ${
							comment ? "btn-primary" : "btn-disabled"
						}`}
						onClick={submitComment}
					>
						发表评论
					</div>
				</div>
			</div>
		);
	}
);

export default CommentBox;
