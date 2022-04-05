import RichTextEditor from './RichText'

const MyRichTextEditor = ({ editorContent, setEditorContent }) => {
	return <RichTextEditor value={editorContent} onChange={setEditorContent} />
}

export default MyRichTextEditor
