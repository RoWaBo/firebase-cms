import { RichTextEditor } from '@mantine/rte'

const MyRichTextEditor = ({ editorContent, setEditorContent }) => {
	return <RichTextEditor value={editorContent} onChange={setEditorContent} />
}

export default MyRichTextEditor
