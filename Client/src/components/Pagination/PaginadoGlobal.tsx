

export const PaginadoGlobal = ({elementsPerPage, elementToShow, pageSet, currentPage}) => {
    const totalPages = Math.ceil(elementToShow.length / elementsPerPage);

    //Obtener rango de paginas para mostrar en paginado
    const getPageRange = () => {
        const rangeSize = 5; //tamaño del rango de paginas a mostrar
        const rangeMiddle = Math.ceil(rangeSize / 2); //para que me de 3, el medio (para este caso es 3)
        let start = currentPage - rangeMiddle + 1;
        let end = currentPage + rangeMiddle - 1;

        if (start < 1) {
            start = 1
            end = Math.min(rangeSize, totalPages);
        } else if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - rangeSize + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }


    const pageNumbers = getPageRange();     //Setea pagenumbers con los datos que recibe por parámetro en la funcion anterior

    return (
      <nav className="flex justify-center">
        <ul className="list-none flex">
          {pageNumbers.map((number) => (
            <li
              className={`w-100 text-center ${
                number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              key={number}
            >
              <button
                onClick={() => pageSet(number)}
                className={`py-2 px-4 rounded ${
                  number === currentPage ? 'font-bold' : 'font-normal'
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
}