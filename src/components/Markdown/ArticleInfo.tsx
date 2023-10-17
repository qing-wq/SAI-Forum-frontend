import React, { useEffect, useState, useRef, useMemo } from "react";
import useCategorysStore from "@/stores/useCategorysStore";
import useTagsStore from "@/stores/useTags";
import { postImage } from "@/apis/articles";
import useArticleEditInfo from "@/hooks/useArticleInfo";

export default function ArticleInfo() {
	return (
		<>
			{/* <form className='whitespace-nowrap'> */}
			<ArticleCategoryRadio />
			<ArticleTageSelect />
			<ArticleCover />
			<ArticleSummary />
			{/* </form> */}
		</>
	);
}

type ArticleCategoryRadioProp = {
	changeCategory: () => {};
};
/** 文章分类单选框 */
function ArticleCategoryRadio() {
	const { articleInfo, saveArticleInfoBus } = useArticleEditInfo();
	const categoryId =
		articleInfo !== "await" ? articleInfo.categoryId : undefined;
	const categorys = useCategorysStore((state) => state.categorys);
	// const [categoryId, setCategoryId] = useState<number>(
	// 	categoryId?.categoryId ||
	// 		(articleInfo != "await" && categorys[0]?.categoryId) ||
	// 		0
	// );
	// useEffect(() => {
	// 	setCategoryId(categoryId?.categoryId || categorys[0]?.categoryId || 0);
	// }, [categorys, categoryId]);
	// 保存分类Id
	useEffect(() => {
		// if (categoryId == categoryId?.categoryId || articleInfo === "await")
		// 	return;
		// let activeCategory;
		// categorys.forEach((cate) => {
		// 	if (cate.categoryId === categoryId) activeCategory = cate;
		// });

		saveArticleInfoBus({ categoryId });
	}, [categoryId]);
	return (
		<div className='form-control w-full '>
			<label className='label'>
				<span className='label-text'>文章分类</span>
			</label>
			<div className='btn-group gap-[0.4rem] flex-wrap justify-start'>
				{categorys.map((category, categoryIndex) => (
					<input
						type='radio'
						name='options'
						data-title={category.category}
						className='btn btn-outline btn-primary	 btn-sm w-[8.5rem] !rounded-md overflow-hidden'
						onChange={() => {
							saveArticleInfoBus({
								categoryId: category.categoryId,
							});
						}}
						checked={category.categoryId == categoryId}
						key={categoryIndex}
					/>
				))}
			</div>
		</div>
	);
}

type ArticleTageSelectProp = {};
/** 文章标签单选框 */
function ArticleTageSelect() {
	const { articleInfo, saveArticleInfoBus } = useArticleEditInfo();
	const articleTagIds =
		articleInfo !== "await" ? articleInfo.tagIds || [] : [];
	const tags = useTagsStore((state) => state.tags);
	// const [tagId, setTagId] = useState<number>(
	// 	articleTags && articleTags[0] ? articleTags[0]?.tagId : -1
	// );
	// useEffect(() => {
	// 	setTagId(articleTags && articleTags[0] ? articleTags[0].tagId : -1);
	// }, [tags]);
	// useEffect(() => {
	// 	if (
	// 		tagId ==
	// 			(articleTags && articleTags[0] ? articleTags[0].tagId : -1) ||
	// 		articleInfo === "await"
	// 	)
	// 		return;
	// 	let activeTag: (typeof tags)[number];
	// 	tags.forEach((tag) => {
	// 		if (tag.tagId === tagId) activeTag = tag;
	// 	});
	// 	saveArticleInfoBus({ tagIds: [tagId] });
	// }, [tagId]);
	return (
		<div className='form-control w-full'>
			<label className='label'>
				<span className='label-text'>文章标签</span>
			</label>
			<select
				className='select select-primary select-sm w-full max-w-xl'
				value={articleTagIds[0] || -1}
				onChange={(e) => {
					saveArticleInfoBus({
						tagIds: [Number(e.target.value) || -1],
					});
				}}
			>
				<option disabled value={-1}>
					请选择文章标签
				</option>
				{tags.map((tag, tagIndex) => (
					<option value={tag.tagId} key={tagIndex}>
						{tag.tag}
					</option>
				))}
			</select>
		</div>
	);
}

/** 文章封面上传框 */
function ArticleCover() {
	const { articleInfo, saveArticleInfoBus } = useArticleEditInfo();
	const cover = articleInfo !== "await" ? articleInfo.picture : undefined;
	const fileInput = useRef<HTMLInputElement>(null);
	const [coverUrl, setCoverUrl] = useState<string | undefined>(cover);
	useEffect(() => {
		if (coverUrl == cover || articleInfo === "await") return;
		saveArticleInfoBus({ picture: coverUrl });
	}, [coverUrl]);
	const deleteCover = async () => {
		await saveArticleInfoBus({ picture: undefined });
		setCoverUrl(undefined);
	};

	const submitCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.currentTarget.files || !e.currentTarget.files[0]) {
			return;
		}
		const image = e.currentTarget.files[0];
		const imageInfo = await postImage(image);
		setCoverUrl(imageInfo?.imagePath || undefined);
	};
	return (
		<div className='form-control w-full max-w-xs'>
			<label className='label'>
				<span className='label-text'>文章封面</span>
			</label>
			{coverUrl ? (
				// TODO:设置封面大小
				<div className='border-primary border-solid rounded-xl overflow-hidden max-h-40 max-w-[15rem] relative'>
					<div
						className='absolute w-full h-full hover:opacity-70 opacity-0 bg-slate-300 flex justify-center items-center text-2xl cursor-pointer'
						onClick={deleteCover}
					>
						删除
					</div>
					<img className='' src={coverUrl} alt='文章封面' />
				</div>
			) : (
				<div>
					<input
						type='file'
						ref={fileInput}
						accept='image/gif,image/jpeg,image/jpg,image/png,image/svg'
						onChange={submitCover}
						className='hidden'
					/>
					<div
						className='btn btn-primary'
						onClick={() => {
							fileInput.current?.click();
						}}
					>
						上传封面
					</div>
				</div>
			)}
		</div>
	);
}

/** 文章摘要 */
function ArticleSummary() {
	const { articleInfo, articleSummaryAutoGenerate, saveArticleInfoBus } =
		useArticleEditInfo();
	const articleSummary = articleInfo !== "await" ? articleInfo.summary : "";
	const [summary, setSummary] = useState<string>(
		articleSummary || articleSummaryAutoGenerate || ""
	);
	useEffect(() => {
		if (articleInfo === "await") return;
		setSummary(articleSummary || articleSummaryAutoGenerate || "");
		saveArticleInfoBus({
			summary: articleSummary || articleSummaryAutoGenerate || "",
		});
	}, [ArticleInfo, articleSummaryAutoGenerate]);
	const changeSummary = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setSummary(e.target.value);
		saveArticleInfoBus({ summary: e.target.value });
	};
	const summaryLength = summary.length;
	return (
		<div className='form-control w-full '>
			<label className='label'>
				<span className='label-text'>文章摘要</span>
				<span className='label-text'>{summaryLength}/100</span>
			</label>
			<textarea
				className={
					"textarea resize-none " +
					(summaryLength >= 50
						? " textarea-primary "
						: " textarea-warning ")
				}
				placeholder='请填写文章摘要'
				value={summary}
				onChange={changeSummary}
				minLength={50}
				maxLength={100}
				rows={4}
			></textarea>
		</div>
	);
}
