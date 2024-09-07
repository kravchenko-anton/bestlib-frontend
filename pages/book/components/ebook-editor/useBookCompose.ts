import api from '@/services/api';
import { errorToast, successToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

import type { Dispatch, SetStateAction } from 'react';
import { MutationKeys } from '@/utils/query-keys';
import { UnfoldOutputImagesInner } from 'api-client/models';
import { EBookPayloadType } from '../../../../../backend/src/book/ebook/dto/ebook.schema';
import { chapterNames } from '@/pages/book/components/ebook-editor/chapter-names';

export const useBookCompose = ({
	ebooks: ebooks,
	setEBooks: setEBooks,
	setImages,
	images
}: {
	ebooks: EBookPayloadType[] | undefined
	images: (UnfoldOutputImagesInner & { isUploaded: boolean })[]
	setImages: Dispatch<
		SetStateAction<(UnfoldOutputImagesInner & { isUploaded: boolean })[]>
	>
	setEBooks: (books: EBookPayloadType[]) => void
}) => {
	const { mutateAsync: unfold, isPending: unfoldLoading } = useMutation({
		mutationKey: MutationKeys.bookTemplate.unfold,
		mutationFn: (file: File) => api.parser.unfold(file),
		onSuccess: () => successToast('File uploaded'),
		onError: () => errorToast('Error while uploading book')
	})
	const removeImageFromContentById = ({
		imageAlt,
		imageId
	}: {
		imageId: string
		imageAlt: string
	}) => {
		if (!ebooks) return errorToast('Error removing image')
		setEBooks(
			ebooks.map(book => ({
				...book,
				chapters: book.chapters.map(chapter => {
					const domHtml = new DOMParser().parseFromString(
						chapter.text,
						'text/html'
					)
					const images = domHtml.querySelectorAll('img')
					for (const image of images) {
						console.log(
							image.getAttribute('id'),
							imageId,
							image.getAttribute('alt'),
							imageAlt
						)
						if (
							image.getAttribute('id') === imageId &&
							image.getAttribute('alt') === '/images/' + imageAlt
						) {
							image.remove()
						}
					}
					return {
						...chapter,
						text: domHtml.body?.innerHTML || chapter.text
					}
				})
			}))
		)
		setImages(images.filter(image => image.id !== imageId))
		successToast('Image removed')
	}
	const deleteBook = ({ bookId }: { bookId: string }) => {
		if (!ebooks) return errorToast('Error deleting book')
		setEBooks(ebooks?.filter(book => book.id !== bookId))
		setImages([])
		successToast('Book deleted')
	}

	const stashEBook = () => {
		if (!ebooks) return errorToast('Error stashing book')
		localStorage.setItem('ebooks', JSON.stringify(ebooks))
		successToast('Book stashed')
	}

	const unStashEBook = () => {
		const ebooks = JSON.parse(localStorage.getItem('ebooks') || '[]')
		setEBooks(ebooks)
		successToast('Book unstashed')
	}

	const trimmingEBookContent = ({
		bookId,
		startLine,
		endLine
	}: {
		bookId: string
		startLine: number
		endLine: number
	}) => {
		if (!ebooks) return errorToast('Error trimming book')
		setEBooks(
			ebooks.map(book => {
				if (book.id === bookId) {
					return {
						...book,
						chapters: book.chapters.map(({ id, name, text }) => ({
							id,
							name,
							text: text
								.split('\n')
								.filter(
									(_, index) => index < startLine - 1 || index > endLine - 1
								)
								.join('\n')
						}))
					}
				}
				return book
			})
		)
		successToast('Book trimmed')
	}

	const generateChapterNames = ({ bookId }: { bookId: string }) => {
		if (!ebooks) return errorToast('Error generating chapter names')

		setEBooks(
			ebooks.map(book => {
				if (book.id === bookId) {
					return {
						...book,
						chapters: book.chapters.map((content, index) => ({
							...content,

							name: `Chapter ${chapterNames[index]}`
						}))
					}
				}
				return book
			})
		)
	}
	const addNewCharacterAfterContent = ({
		bookId,
		chapterId
	}: {
		bookId: string
		chapterId: string
	}) => {
		if (!ebooks) return errorToast('Error adding new chapter')
		setEBooks(
			ebooks.map(book => {
				if (book.id === bookId) {
					const index = book.chapters.findIndex(
						content => content.id === chapterId
					)

					return {
						...book,
						chapters: [
							...book.chapters.slice(0, index + 1),
							{
								id: Math.round(Math.random() * 1_000_000).toString(),
								name: '',
								text: ''
							},
							...book.chapters.slice(index + 1)
						]
					}
				}
				return book
			})
		)
	}
	const moveChaptersToNewBook = ({
		bookId,
		chapterId
	}: {
		bookId: string
		chapterId: string
	}) => {
		if (!ebooks) return errorToast('Error moving chapters')
		const book = ebooks.find(book => book.id === bookId)
		if (!book) return ebooks
		const index = book.chapters.findIndex(content => content.id === chapterId)
		if (index <= 1) return errorToast('Error moving chapters')
		const chapters = book.chapters.slice(index)
		const oldBookChapters = book.chapters.filter(
			content => !chapters.some(chapter => chapter.id === content.id)
		)
		const newBook = {
			id: (ebooks.length + 1).toString(),
			title: `${ebooks.length + 1} book`,
			chapters
		}
		return setEBooks([
			...ebooks.map(book =>
				book.id === bookId ? { ...book, chapters: oldBookChapters } : book
			),
			newBook
		])
	}

	const mergeContentWithTopCharacter = ({
		bookId,
		topChapterId,
		insertedContent
	}: {
		bookId: string
		topChapterId: string
		insertedContent: string
	}) => {
		if (!ebooks) return errorToast('Error merging content')
		return setEBooks(
			ebooks.map(book => {
				if (book.id === bookId) {
					const element = book.chapters.find(
						content => content.id === topChapterId
					)
					const index = book.chapters.findIndex(
						content => content.id === topChapterId
					)
					if (!element) {
						errorToast('Error merging content')
						return book
					}
					return {
						...book,
						chapters: [
							...book.chapters.slice(0, index),
							{
								id: element.id,
								name: element.name,
								text: `${element.text}\n${insertedContent}`
							},
							...book.chapters.slice(index + 1)
						].filter(content => content.text !== insertedContent)
					}
				}
				return book
			})
		)
	}

	const updateBookTitle = ({
		value,
		bookId
	}: {
		value: string
		bookId: string
	}) => {
		if (!ebooks) return errorToast('Error updating book title')
		setEBooks(
			ebooks.map(book => {
				if (book.id === bookId) {
					return {
						...book,
						title: value
					}
				}
				return book
			})
		)
	}

	const removeChapter = (bookId: string, removedId: string) => {
		if (!ebooks) return errorToast('Error removing chapter')
		setEBooks(
			ebooks.map(book => {
				if (book.id === bookId) {
					return {
						...book,
						chapters: book.chapters.filter(content => content.id !== removedId)
					}
				}
				return book
			})
		)
		successToast('Chapter removed')
	}

	const updateChapter = ({
		chapterId,
		bookId,
		value
	}: {
		chapterId: string
		bookId: string
		value: {
			name?: string
			text?: string
		}
	}) => {
		if (!ebooks) return errorToast('Error updating chapter')
		setEBooks(
			ebooks.map(book => {
				if (book.id === bookId) {
					return {
						...book,
						chapters: book.chapters.map(chapter => {
							if (chapter.id === chapterId) {
								return {
									...chapter,
									...value
								}
							}
							return chapter
						})
					}
				}
				return book
			})
		)
	}

	const upload = ({
		title,
		chapters
	}: {
		title: string
		chapters: {
			id: string
			name: string
			text: string
		}[]
	}) => {
		const elementIndex = ebooks?.length || 0

		setEBooks([
			...(ebooks || []),
			{
				id: (elementIndex + 1).toString(),
				title: title || '',
				chapters: chapters || []
			}
		])
		successToast('Book uploaded')
	}

	const unfoldWithUpload = (files: File[]) => {
		for (const file of files) {
			unfold(new File([file], file.name)).then(
				({ data: { chapters, images } }) => {
					upload({
						title: file.name,
						chapters
					})
					setImages(images.map(image => ({ ...image, isUploaded: false })))
				}
			)
		}
	}
	const isImageComponentExist = (imageId: string, imageAlt: string) => {
		if (!ebooks) return false
		return ebooks.some(book =>
			book.chapters.some(chapter => {
				const domHtml = new DOMParser().parseFromString(
					chapter.text,
					'text/html'
				)
				const images = domHtml.querySelectorAll('img')
				for (const img of images) {
					if (
						img.getAttribute('id') === imageId &&
						img.getAttribute('alt') === '/images/' + imageAlt
					) {
						return true
					}
				}
				return false
			})
		)
	}

	const uploadImageToServer = async ({
		imageId,
		imageAlt
	}: {
		imageId: string
		imageAlt: string
	}) => {
		const image = images.find(image => image.id === imageId.toString())
		if (!image) return errorToast('Error uploading image')
		if (!isImageComponentExist(imageId, imageAlt)) {
			return errorToast('Image not found in content')
		}
		const { data: path } = await api.storage.upload(
			'imagesInBook',
			new File([Buffer.from(image.data, 'base64')], imageAlt)
		)
		setImages(
			images.map(img =>
				img.id === imageId ? { ...img, isUploaded: true } : img
			)
		)
		setEBooks(
			(ebooks || []).map(book => ({
				...book,
				chapters: book.chapters.map(chapter => {
					const domHtml = new DOMParser().parseFromString(
						chapter.text,
						'text/html'
					)
					const images = domHtml.querySelectorAll('img')
					for (const img of images) {
						if (
							img.getAttribute('id') === imageId &&
							img.getAttribute('alt') === '/images/' + imageAlt
						) {
							console.log('path.name set', path.name)
							img.setAttribute('src', path.name)
						}
					}
					return {
						...chapter,
						text: domHtml.body?.innerHTML || chapter.text
					}
				})
			}))
		)
		successToast('Images uploaded')
	}

	return {
		books: {
			stashEBook,
			unStashEBook,
			upload: unfoldWithUpload,
			state: ebooks || [],
			unfoldLoading,
			trimmingEBookContent,
			uploadImageToServer,
			isImageComponentExist,
			generateChapterNames,
			addNewCharacterAfterContent,
			delete: deleteBook,
			removeImageFromContentById,
			updateToc: updateChapter,
			updateBookTitle,
			mergeContentWithTopCharacter,
			removeToc: removeChapter,
			moveChaptersToNewBook
		}
	}
}
