import { Bug, MaskHappy,Cactus, SealWarning , Rocket} from '@phosphor-icons/react';

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

export const farewellToast = (text: string) => {
	return toast(text, {
		duration: 4000,
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
