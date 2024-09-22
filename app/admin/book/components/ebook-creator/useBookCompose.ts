import { chapterNames } from '@/app/admin/book/components/ebook-creator/chapter-names'
import api from '@/services/api'
import { MutationKeys } from '@/utils/query-keys'
import { errorToast, successToast } from '@/utils/toast'
import type { UnfoldChapterType } from '@/validation/ebook/chapter.schema'
import { useMutation } from '@tanstack/react-query'
import type { Dispatch, SetStateAction } from 'react'

export const textCalculation = (text: string) => {
	const dom = new DOMParser().parseFromString(text, 'text/html')
	const body = dom.querySelector('body')
	const wordCount = Number(body?.textContent?.split(' ').length)
	const symbolCount = Number(body?.textContent?.length)
	return {
		wordCount,
		symbolCount
	}
	
}
export const useBookCompose = ({
	chapters,
	setEBooks,
}: {

	chapters: UnfoldChapterType[]
	setEBooks: Dispatch<SetStateAction<UnfoldChapterType[]>>
}) => {
	const { mutateAsync: unfold, isPending: unfoldLoading } = useMutation({
		mutationKey: MutationKeys.bookTemplate.unfold,
		mutationFn: (file: File) => api.ebook.unfold(file),
		onSuccess: () => successToast('File uploaded'),
		onError: () => errorToast('Error while uploading book')
	})

	const deleteBook = () => {
		if (!chapters) return errorToast('Error deleting book')
		setEBooks([])
		successToast('Book deleted')
	}

	const stashEBook = () => {
		if (!chapters) return errorToast('Error stashing book')
		localStorage.setItem('chapters', JSON.stringify(chapters))
		successToast('Book stashed')
	}

	const unStashEBook = () => {
		const ebooks = JSON.parse(localStorage.getItem('chapters') || '[]')
		setEBooks(ebooks)
		successToast('Book unstashed')
	}

	const trimmingEBookContent = ({
		startLine,
		endLine
	}: {
		startLine: number
		endLine: number
	}) => {
		if (!chapters) return errorToast('Error trimming book')
		setEBooks(
			chapters.map(({ content,...rest }) => ({
				...rest,
				content: content
					.split('\n')
					.filter(
						(_, index) => index < startLine - 1 || index > endLine - 1
					)
					.join('\n')
			}))
		)
		successToast('Book trimmed')
	}

	const generateChapterNames = () => {
		if (!chapters) return errorToast('Error generating chapter names')
		setEBooks(
			chapters.map((content, index) => ({
				...content,
				title: `Chapter ${chapterNames[index]}`
			}))
		)
		successToast('Chapter names generated')
	}

	const removeChapter = (removedId: string) => {
		if (!chapters) return errorToast('Error removing chapter')
		setEBooks(
			chapters.filter(content => content.id !== removedId
		))
		successToast('Chapter removed')
	}

	const updateChapter = ({
		chapterId,
		value
	}: {
		chapterId: string
		value: {
			title?: string
			content?: string
			position?: number
			wordCount?: number
			symbolCount?: number
		}
	}) => {
		if (!chapters) return errorToast('Error updating chapter')
		setEBooks(
			chapters.map(chapter => {
				if (chapter.id === chapterId && value !== undefined) {
					return {
						...chapter,
						...value
					}
				}
				return chapter
			})

		)
	}

	const upload = ({
		chapters
	}: {
		chapters: {
			id: string
			title: string
			content: string
			position: number
			wordCount: number
			symbolCount: number
		}[]
	}) => {
		console.log('uploading', chapters)
		setEBooks(chapters)
		successToast('Book uploaded')
	}

	const unfoldWithUpload = (file: File) => {
			unfold(new File([file], file.name)).then(
				({ data: { chapters } }) => {
					
					upload({
						chapters: chapters.map((chapter, index) => {
							const {wordCount,symbolCount} = textCalculation(chapter.content)
							return {
								...chapter,
								position: index + 1,
								wordCount,
								symbolCount
							}
						})
					})
				}
			)
	}
	const calculateChapters = () => {
		setEBooks( chapters.map((chapter, index) => {
		const {wordCount,symbolCount} = textCalculation(chapter.content)
			return {
				...chapter,
				position: index + 1,
				wordCount,
				symbolCount
			}
		}))
	}
console.log(chapters)
	return {
		books: {
			calculateChapters,
			stashEBook,
			unStashEBook,
			upload: unfoldWithUpload,
			unfoldLoading,
			state: chapters,
			trimmingEBookContent,
			generateChapterNames,
			delete: deleteBook,
			updateToc: updateChapter,
			removeToc: removeChapter,
		}
	}
}
