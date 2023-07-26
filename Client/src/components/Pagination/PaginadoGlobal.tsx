import React from 'react';
import { Hotel } from '../../models';
import { Room } from '../../Store';

interface PaginadoGlobalProps {
  elementsPerPage: number;
  elementToShow: Hotel[] | Room[];
  pageSet: (pageNumber: number) => void;
  currentPage: number;
}

const PaginadoGlobal: React.FC<PaginadoGlobalProps> = ({
  elementsPerPage,
  elementToShow,
  pageSet,
  currentPage,
}) => {
  const totalPages = Math.ceil(elementToShow.length / elementsPerPage);



  //Obtener rango de paginas para mostrar en paginado
  const getPageRange = () => {
    const rangeSize = 3; //tamaño del rango de paginas a mostrar
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
    <nav className="flex justify-center mt-10">
      <div>
        <div className="flex justify-center">
          <button
            className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'} rounded`}
            onClick={() => pageSet(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          {pageNumbers.map((number) => {
            if (number >= currentPage + 4 || number <= currentPage - 4) {
              return null;
            }
            return (
              <button
                className={`px-4 py-2 mx-1 ${number === currentPage ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-200 hover:bg-blue-300 text-blue-800'} rounded`}
                key={number}
                onClick={() => pageSet(number)}
              >
                {number}
              </button>
            );
          })}
          <button
            className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'} rounded`}
            onClick={() => pageSet(currentPage + 1)}
            disabled={currentPage === totalPages}
          >Siguiente</button>
        </div>
      </div>
    </nav>
  );
}

export default PaginadoGlobal;