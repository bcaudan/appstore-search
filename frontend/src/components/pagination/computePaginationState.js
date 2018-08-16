const DISPLAYED_PAGES = 5;

export default function computePaginationState(nbPages, currentPage) {
  const currentOffset = Math.floor(currentPage / DISPLAYED_PAGES);
  const offsetMax = Math.ceil(nbPages / DISPLAYED_PAGES) - 1;
  return {
    currentPage,
    previous: computePageForPrevious(currentOffset),
    displayedPages: computeDisplayedPages(currentOffset, offsetMax, nbPages),
    next: computePageForNext(currentOffset, offsetMax),
  };
}

function computeDisplayedPages(currentOffset, offsetMax, nbPages) {
  const displayedPages = [];
  const nbOfDisplayedPages = currentOffset === offsetMax
    ? nbPages % DISPLAYED_PAGES
    : DISPLAYED_PAGES;
  for (let i = 0; i < nbOfDisplayedPages; i++) {
    displayedPages.push((currentOffset * DISPLAYED_PAGES) + i);
  }
  return displayedPages;
}

function computePageForPrevious(currentOffset) {
  return currentOffset > 0
    ? (currentOffset - 1) * DISPLAYED_PAGES
    : -1;
}

function computePageForNext(currentOffset, offsetMax) {
  return currentOffset < offsetMax
    ? (currentOffset + 1) * DISPLAYED_PAGES
    : -1;
}
