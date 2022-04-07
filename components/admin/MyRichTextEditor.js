import RichTextEditor from './RichText'

const MyRichTextEditor = ({ editorContent, setEditorContent }) => {
	const controlsConfig = [
		['bold', 'italic', 'underline', 'strike', 'clean'],
		['h1', 'h2', 'h3', 'h4'],
		['unorderedList', 'orderedList'],
		['alignLeft', 'alignCenter', 'alignRight'],
		['link', 'image', 'video', 'blockquote', 'codeBlock'],
	]
	return (
		<RichTextEditor
			value={editorContent}
			onChange={setEditorContent}
			controls={controlsConfig}
			style={{ height: '71%' }}
		/>
	)
}
export default MyRichTextEditor
