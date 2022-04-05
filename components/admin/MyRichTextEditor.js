import { RichTextEditor } from '@mantine/rte'
import { useState } from 'react'

const MyRichTextEditor = ({ editorContent, setEditorContent }) => {
	return <RichTextEditor value={editorContent} onChange={setEditorContent} />
}

export default MyRichTextEditor
