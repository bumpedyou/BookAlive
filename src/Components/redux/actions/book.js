//Add Book
export const addBook = (item) => ({
  type: 'ADD_BOOK',
  payload: item
})


export const clearAddedBooItems = () => ({
  type: 'CLEAR_BOOK',
})
