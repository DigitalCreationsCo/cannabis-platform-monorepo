import { useState } from 'react';
import TextField, { type TextFieldProps } from '../TextField/TextField';

const AutoCompleteTextField = ({
	onChange,
	suggestions,
	...props
}: { suggestions: string[] } & TextFieldProps) => {
	// const [query, setQuery] = useState('');

	// const fetchSuggestions = async (searchTerm) => {
	//   if (searchTerm.length < 3) {
	//     setSuggestions([]);
	//     return;
	//   }

	//   try {
	//     const response = await axios.get('https://us1.locationiq.com/v1/autocomplete.php', {
	//       params: {
	//         key: 'YOUR_API_KEY',
	//         q: searchTerm,
	//         format: 'json'
	//       }
	//     });

	//     setSuggestions(response.data);
	//   } catch (error) {
	//     console.error("Error fetching suggestions:", error);
	//     setSuggestions([]);
	//   }
	// };

	const handleInputChange = (event) => {
		const newQuery = event.target.value;
		// setQuery(newQuery);
		onChange && onChange(newQuery);
		// fetchSuggestions(newQuery);
	};

	return (
		<div>
			<TextField
				type="text"
				value={props.value}
				onChange={handleInputChange}
				placeholder="Start typing a city name..."
			/>
			<ul>
				{suggestions.map((suggestion, index) => (
					<li key={`suggestion-${index}`}>{suggestion}</li>
				))}
			</ul>
		</div>
	);
};

export default AutoCompleteTextField;
