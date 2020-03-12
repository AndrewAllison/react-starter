import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

const onSearch$ = new Subject();

const DebouncedSearch = ({ name, label = 'Search', onTermUpdating, subject = onSearch$, onDebounceCompleted, debounceValue = 600 }) => {
	const [state, setState] = useState(name);

	const onTextChanged = (e) => {
		setState(e.target.value);
		onTermUpdating(e.target.value);
		subject.next(e.target.value);
	};

	useEffect(() => {
		const subscription = subject
			.pipe(debounceTime(debounceValue))
			.subscribe((e) => {
				console.log('Debounced', e);
				onDebounceCompleted(e);
			});
		return () => {
			subscription.unsubscribe();
		};
		// Not happy about this but it's caused loads of grief.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<TextField className={'full-width'}
				   id="standard-basic"
				   label={label}
				   value={state}
				   onChange={onTextChanged}/>
	)
};
export default DebouncedSearch;
