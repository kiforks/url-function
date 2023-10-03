const SQUARE_SIZE = '100px';
const INITIAL_COLOR = 'black';
const SUCCESS_COLOR_ONE = 'green';
const SUCCESS_COLOR_ZERO = 'blue';
const ERROR_COLOR = 'red';
const ANIMATION_TIMEOUT = 1000;

const createSquare = () => {
	const square = document.createElement('div');

	square.style.left = square.style.top = '0';
	square.style.width = square.style.height = SQUARE_SIZE;
	square.style.backgroundColor = INITIAL_COLOR;
	square.style.position = 'absolute';

	document.body.appendChild(square);

	return square;
}

const getSquareAnimation = square => square.animate(
	[
		{ transform: 'translateX(0)' },
		{ transform: 'translateX(100px)' }
	],
	{
		duration: ANIMATION_TIMEOUT,
		fill: 'forwards',
	},
)

const animateBackground = async (square, response) => {
	const isError = !response || response.status !== 200;
	const data = await response.json();

	square.style.backgroundColor = isError ? ERROR_COLOR : data ? SUCCESS_COLOR_ONE : SUCCESS_COLOR_ZERO;
}

const processUrl = async url => {
	const square = createSquare();
	const animation = getSquareAnimation(square);
	const response = fetch(url);

	animation.onfinish = async () => {
		const data = await response;

		await animateBackground(square, data);

		animation.onfinish = null;
	};
}

processUrl('https://keev.me/f/slowpoke.php');
