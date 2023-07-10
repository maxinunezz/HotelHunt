import { roomsStore } from '../../Store';

export const RoomsPagination = () => {
	const { currentPage, pageNumbers } = roomsStore((state) => ({
		currentPage: state.currentPage,
		pageNumbers: state.pageNumbers,
	}));

	const { changeCurrentPage } = roomsStore();

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
		<nav className="flex justify-center">
			<div>
				<div className="flex justify-center">
					<button
						className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
						onClick={onPreviusPage}
					>
						Anterior
					</button>
					{pageNumbers.map((page) => {
						if (page >= currentPage + 4 || page <= currentPage - 4) {
							return null;
						}
						return (
							<button
								className="px-4 py-2 mx-1 bg-blue-200 hover:bg-blue-300 text-blue-800 rounded"
								key={page}
								onClick={() => {
									onSpecificPage(page);
								}}
							>
								{page}
							</button>
						);
					})}
					<button
						className={`px-4 py-2 ${currentPage !== pageNumbers.length
								? 'bg-blue-500 hover:bg-blue-600 text-white'
								: 'bg-gray-500 text-gray-300 cursor-not-allowed'
							} rounded`}
						onClick={currentPage !== pageNumbers.length ? onNextPage : undefined}
					>
						Siguiente
					</button>
				</div>
			</div>
		</nav>

	);
};
