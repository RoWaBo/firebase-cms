import RichTextEditor from './RichText'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const MyRichTextEditor = ({
	editorContent,
	setEditorContent,
	handleImageUploade,
	minHeight,
	isSaving,
	...props
}) => {
	const controlsConfig = [
		['bold', 'italic', 'underline', 'strike', 'clean'],
		['h1', 'h2', 'h3', 'h4'],
		['unorderedList', 'orderedList'],
		['alignLeft', 'alignCenter', 'alignRight'],
		['link', 'blockquote', 'codeBlock'],
	]

	const editorStyle = css`
		${minHeight && `min-height: ${minHeight};`}
		& .quill p {
			font-size: 14px;
		}
		& .quill h1 {
			font-size: 30px;
			font-weight: 500;
		}
		& .quill h2 {
			font-size: 25px;
			font-weight: 500;
		}
		& .quill h3 {
			font-size: 20px;
			font-weight: 700;
		}
		& .quill h4 {
			font-size: 18px;
			font-weight: 700;
		}
		& .quill strong {
			font-weight: 500;
		}
		& .ql-tooltip {
			left: 3px !important;
		}
	`

	return (
		<RichTextEditor
			{...props}
			value={editorContent}
			onChange={setEditorContent}
			onImageUpload={handleImageUploade}
			controls={controlsConfig}
			css={editorStyle}
			sticky={false}
		/>
	)
}
export default MyRichTextEditor
