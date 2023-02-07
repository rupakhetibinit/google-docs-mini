import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { useEffect, useRef } from 'react';

// Set up the Hocuspocus WebSocket provider

const Tiptap = () => {
	const providerRef = new HocuspocusProvider({
		url: 'ws://127.0.0.1:1234',
		name: 'example-document',
	});
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				history: false,
			}),
			Collaboration.configure({
				document: providerRef.document,
			}),
		],
		content: '',
	});
	if (providerRef === null || undefined) {
		return null;
	}
	return <EditorContent editor={editor} />;
};

export default Tiptap;
