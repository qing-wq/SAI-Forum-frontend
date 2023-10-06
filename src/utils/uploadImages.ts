import { postImage } from "@/apis/articles";

/** 图片长传返回插入文章格式 */
type ImageUploadRes = { title: string; alt: string; url: string };

/**
 * 图片上传方法
 */
export const uploadImages = (images: File[]): Promise<ImageUploadRes[]> => {
	return Promise.all(
		images.map(
			(image) =>
				new Promise<ImageUploadRes>(async (resolve) => {
					const title = image.name;
					const alt = image.name;
					const { imagePath: url } = await postImage(image);
					resolve({ title, alt, url });
				})
		)
	);
};
