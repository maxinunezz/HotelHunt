import { XCircle ,Bug,CheckCircle , MaskHappy, Cactus, SealWarning, Rocket, BookmarkSimple, StackOverflowLogo, SmileySad, ClockCounterClockwise, UserSwitch, IdentificationCard } from '@phosphor-icons/react';

import { toast } from 'react-hot-toast';

export const errorToast = (text: string) => {
	return toast(text, {
		duration: 4000,
		position: 'bottom-center',
		style: {
			backgroundColor: '#f44336',
			color: 'white',
			fontWeight: 'bold',
		},
		icon: <Bug size={32} />,
		ariaProps: {
			role: 'status',
			'aria-live': 'polite',
		},
	});
};

export const successToast = (text: string) => {
	return toast(text, {
		duration: 4000,
		position: 'bottom-center',
		style: {
			backgroundColor: '#26a69a',
			color: 'white',
			fontWeight: 'bold',
		},
		icon: <MaskHappy size={32} />,
		ariaProps: {
			role: 'status',
			'aria-live': 'polite',
		},
	});
};
export const reserveSuccessToast = (text: string) => {
	return toast(text, {
		duration: 4000,
		position: 'bottom-center',
		style: {
			backgroundColor: '#fffc31',
			color: 'black',
			fontWeight: 'bold',
		},
		icon: <BookmarkSimple size={32} />,
		ariaProps: {
			role: 'status',
			'aria-live': 'polite',
		},
	});
};

export const reserveErrorToast = (text: string) => {
	return toast(text, {
		duration: 4000,
		position: 'bottom-center',
		style: {
			backgroundColor: '#26a69a',
			color: 'white',
			fontWeight: 'bold',
		},
		icon: <SealWarning size={32} />,
		ariaProps: {
			role: 'status',
			'aria-live': 'polite',
		},
	});
}
export const reserveFullToast = (text: string) => {
	return toast(text, {
		duration: 4000,
		position: 'bottom-center',
		style: {
			backgroundColor: '#8B687F',
			color: 'white',
			fontWeight: 'bold',
		},
		icon: <StackOverflowLogo size={32} />,
		ariaProps: {
			role: 'status',
			'aria-live': 'polite',
		},
	});
}

export const farewellToast = (text: string) => {
	return toast(text, {
		duration: 1000,
		position: 'top-center',
		style: {
			backgroundColor: '#0d47a1',
			color: 'white',
			fontWeight: 'bold',
		},
		icon: <Cactus size={32} />,
		ariaProps: {
			role: 'status',
			'aria-live': 'polite',
		},
	});
};

export const farewellAdminToast = (text: string) => {
	return toast(text, {
		duration: 4000,
		position: 'top-center',
		style: {
			backgroundColor: '#fffc31',
			color: 'black',
			fontWeight: 'bold',
		},
		icon: <Rocket size={32} />,
		ariaProps: {
			role: 'status',
			'aria-live': 'polite',
		},
	});
};
export const filterResetToast = (text: string) => {
	return toast(text, {
		duration: 2000,
		position: 'top-center',
		style: {
			backgroundColor: '#D7BBF5',
			color: 'black',
			fontWeight: 'bold',
		},
		icon: <ClockCounterClockwise size={32} />,
		ariaProps: {
			role: 'status',
			'aria-live': 'polite',
		},
	});
};

export const noDatesToast = () => {
	return toast("Por favor, seleccione las fechas de llegada y salida", {
		duration: 4000,
		position: "bottom-center",
		style: {
			backgroundColor: "red",
			color: "white",
			fontWeight: "bold"
		},
		icon:<XCircle size={32} color="white" weight="thin" />,
		ariaProps: {
			role: "status",
			"aria-live": "polite"
		}
	});
};

export const invalidDatesToast = () => {
	return toast("Por favor, seleccione fechas válidas", {
		duration: 4000,
		position: "bottom-center",
		style: {
			backgroundColor: "#ffeb3b",
			color: "black",
			fontWeight: "bold"
		},
		ariaProps: {
			role: "status",
			"aria-live": "polite"
		}
	});
};


export const reserveSuccessToast1 = () => {
	return toast("Habitación reservada exitosamente", {
		duration: 4000,
		position: "bottom-center",
		style: {
			backgroundColor: "#4caf50",
			color: "white",
			fontWeight: "bold"
		},
		icon:<CheckCircle size={32} color="white" weight="thin" />,
		ariaProps: {
			role: "status",
			"aria-live": "polite"
		}
	});
};

export const userDeleteToast = (text: string) => {
	return toast(text, {
		duration: 2000,
		position: 'top-center',
		style: {
			backgroundColor: '#1D5D9B',
			color: 'black',
			fontWeight: 'bold',
		},
		icon: <SmileySad size={32} />,
		ariaProps: {
			role: 'status',
			'aria-live': 'polite',
		},
	});
};



export const userUpdateToast = (text: string) => {
	return toast(text, {
		duration: 2000,
		position: 'top-center',
		style: {
			backgroundColor: '#1D5D9B',
			color: 'black',
			fontWeight: 'bold',
		},
		icon: <UserSwitch size={32} />,
		ariaProps: {
			role: 'status',
			'aria-live': 'polite',
		},
	});
};
export const mustLoginToast = (text: string) => {
	return toast(text, {
		duration: 2000,
		position: 'top-center',
		style: {
			backgroundColor: '#468B97',
			color: 'black',
			fontWeight: 'bold',
		},
		icon: <IdentificationCard size={32} />,
		ariaProps: {
			role: 'status',
			'aria-live': 'polite',
		},
	});
};

