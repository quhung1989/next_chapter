import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
	let inputElement;
	let inputClasses = [];

	if (props.classProp) {
		inputClasses.push(props.classProp)
	} else {
		inputClasses.push(classes.InputElement)
	}

	if (props.value) {
		if (props.invalid && props.value.length > 0) {
			inputClasses.push(classes.Invalid);
		}
	}


	switch (props.eleType) {
		case ('input'):
			inputElement = <input
				type='text'
				className={inputClasses.join(' ')}
				value={props.value}
				placeholder={props.placeholder}
				onChange={props.changed}
				{...props.eleConfig} />;
			break;
		case ('password'):
			inputElement = <input
				type='password'
				className={inputClasses.join(' ')}
				value={props.value}
				placeholder={props.placeholder}
				onChange={props.changed}
				{...props.eleConfig} />;
			break;
		case ('textarea'):
			inputElement = <textarea
				className={inputClasses.join(' ')}
				value={props.value}
				placeholder={props.placeholder}
				onChange={props.changed}
				{...props.eleConfig} />;
			break;
		case ('image'):
			inputElement = <input
				id={props.id}
				type='file'
				name='image'
				className={`${props.classProp}`}
				onChange={props.changed}
				{...props.eleConfig} />;
			break;
		default:
			inputElement = <input
				className={inputClasses.join(' ')}
				value={props.value}
				placeholder={props.placeholder}
				onChange={props.changed}
				{...props.eleConfig} />;
	}
	return (
		<div>
			{inputElement}
		</div>
	);
};

export default input;