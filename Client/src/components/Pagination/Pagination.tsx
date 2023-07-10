import { hotelStore } from '../../Store';

export const Pagination = () => {
	const { currentPage, pageNumbers } = hotelStore((state) => ({
		currentPage: state.currentPage,
		pageNumbers: state.pageNumbers,
	}));

	const { changeCurrentPage } = hotelStore();

	const onPreviusPage = () => {
		if (currentPage === 1) {
			return;
		}
		changeCurrentPage(currentPage - 1);
	};

	const onNextPage = () => {
		changeCurrentPage(currentPage + 1);
	};

	const onSpecificPage = (number) => {
		changeCurrentPage(number);
	};

	if (pageNumbers.length < 2) {
		return null;
	}

	return (
		<nav>
			<button onClick={onPreviusPage}>Anterior</button>
			<div>
				{pageNumbers.map((page) => {
					if (page >= currentPage + 4 || page <= currentPage - 4) {
						return null;
					}
					return (
						<button
							key={page}
							onClick={() => {
								onSpecificPage(page);
							}}
						>
							{page}
						</button>
					);
				})}
			</div>
			<button
				onClick={currentPage !== pageNumbers.length ? onNextPage : undefined}
			>
				Siguiente
			</button>
		</nav>
	);
};
