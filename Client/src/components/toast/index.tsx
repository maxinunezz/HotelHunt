import { Bug, MaskHappy } from '@phosphor-icons/react';
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
