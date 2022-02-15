import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import '@testing-library/jest-dom';
import {getOnlyVisible, getClickable, getNotVisible, setNarrow, setWide}
from './common';
import App from '../App';

const URL = '/v0/category';
const url = '/v0/listing';

const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return res(ctx.json([{name: 'Vehicles', subcategories: {subcategories:
      ['Sedan', 'Coupe']}},
    {name: 'Apparel', subcategories: {subcategories: ['Casual', 'Sports']}},
    ]));
  }),
  rest.get(url, (req, res, ctx) => {
    return res(ctx.json([{'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      'name': 'coat',
      'price': '$400',
      'longitude': '17.98765',
      'latitude': '-4.87654',
      'img_url': 'https://robohash.org/earumnonfacilis.png?size=50x50&set=set1',
      'category': 'Apparel',
      'create_user': 'King',
      'create_time': '2021-12-04T01:06:09.753Z',
      'replies': '',
      'subcategory': 'Casual'},
    ]));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**
 */
test('App Renders', async () => {
  render(<App />);
  setWide();
});

test('Vehicles and Sedan Clickable', async () => {
  render(<App />);
  setWide();
  const inputEl = await waitFor(() => screen.getByText('Vehicles'));
  fireEvent.click(inputEl);
  const inputEle = await waitFor(() => screen.getByText('Sedan'));
  fireEvent.click(inputEle);
});

test('Reset Clickable', async () => {
  render(<App />);
  setWide();
  const inputEl = await waitFor(() => screen.getByText('Reset'));
  fireEvent.click(inputEl);
});

test('Title Visible', async () => {
  render(<App />);
  getOnlyVisible('FacepalmBook');
});

test('Categories Visible', async () => {
  render(<App />);
  getOnlyVisible('Categories');
});

test('P Clickable', async () => {
  render(<App />);
  fireEvent.click(getClickable('p'));
});

test('POST Clickable', async () => {
  render(<App />);
  getClickable('post');
});

test('SEARCH Clickable', async () => {
  render(<App />);
  getClickable('search');
});

test('LOGIN Clickable', async () => {
  render(<App />);
  getClickable('login');
});

// test('Apparel Clickable', async () => {
//   render(<App />);
//   setWide();
//   const inputEl = await waitFor(() => screen.getByText('Apparel'));
//   fireEvent.click(inputEl);
// });

// test('Electronics Clickable', async () => {
//   render(<App />);
//   setWide();
//   const inputEl = await waitFor(() => screen.getByText('Electronics'));
//   fireEvent.click(inputEl);
// });

// test('Entertainment Clickable', async () => {
//   render(<App />);
//   setWide();
//   const inputEl = await waitFor(() => screen.getByText('Entertainment'));
//   fireEvent.click(inputEl);
// });

// test('Family Clickable', async () => {
//   render(<App />);
//   setWide();
//   const inputEl = await waitFor(() => screen.getByText('Family'));
//   fireEvent.click(inputEl);
// });

// test('Hobbies Clickable', async () => {
//   render(<App />);
//   setWide();
//   const inputEl = await waitFor(() => screen.getByText('Hobbies'));
//   fireEvent.click(inputEl);
// });

test('Search Input', async () => {
  render(<App />);
  setWide();
  const inputEl = screen.getByTestId('area4');
  expect(inputEl).toBeInTheDocument();
});

test('pass input to input field', async () => {
  render(<App />);
  setWide();
  const inputEl = screen.getByTestId('area4');
  fireEvent.change(inputEl, {target: {value: 'abc'}});
  fireEvent.click(getClickable('search'));
});

test('Post Use', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Post'));
  const inputEl = screen.getByTestId('post1');
  userEvent.type( inputEl, 'hammer');
  // expect(screen.getByTestId("name input")).toHaveValue('hammer');
  const inputEle = screen.getByTestId('post2');
  userEvent.type(inputEle, '1000');
  // expect(screen.getByTestId('price input')).toHaveValue(1000);
  const inputElem = screen.getByTestId('post3');
  userEvent.type(inputElem, 'Electronics');
  // expect(screen.getByTestId('category input')).toHaveValue('Electronics');
  const inputElement = screen.getByTestId('post4');
  userEvent.type(inputElement, 'Power');
  // expect(screen.getByTestId('subcategory input')).toHaveValue('Power');
  fireEvent.click(getOnlyVisible('POST'));
});

test('Post Close Use', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Post'));
  const ele = screen.getByTestId('post close');
  fireEvent.click(ele);
  getNotVisible('Name');
  getNotVisible('Price');
  getNotVisible('Category');
});

// test('Category Vehicles Use', () => {
//   render(<App />);
//   fireEvent.click(getOnlyVisible('Vehicles'));
//   fireEvent.click(getOnlyVisible('SEDAN'));

//   fireEvent.click(getOnlyVisible('Reset'));
//   fireEvent.click(getOnlyVisible('Vehicles'));
//   fireEvent.click(getOnlyVisible('COUPE'));
// });

// test('Category Apparel Use', () => {
//   render(<App />);
//   fireEvent.click(getOnlyVisible('Apparel'));
//   fireEvent.click(getOnlyVisible('CASUAL'));

//   fireEvent.click(getOnlyVisible('Reset'));
//   fireEvent.click(getOnlyVisible('Apparel'));
//   fireEvent.click(getOnlyVisible('SPORTS'));
// });

// test('Category Electronics Use', () => {
//   render(<App />);
//   fireEvent.click(getOnlyVisible('Electronics'));
//   fireEvent.click(getOnlyVisible('DIGITAL'));

//   fireEvent.click(getOnlyVisible('Reset'));
//   fireEvent.click(getOnlyVisible('Electronics'));
//   fireEvent.click(getOnlyVisible('POWER'));
// });

// test('Category Entertainment Use', () => {
//   render(<App />);
//   fireEvent.click(getOnlyVisible('Entertainment'));
//   fireEvent.click(getOnlyVisible('GAMES'));

//   fireEvent.click(getOnlyVisible('Reset'));
//   fireEvent.click(getOnlyVisible('Entertainment'));
//   fireEvent.click(getOnlyVisible('MOVIES'));
// });

// test('Category Family Use', () => {
//   render(<App />);
//   fireEvent.click(getOnlyVisible('Family'));
//   fireEvent.click(getOnlyVisible('KITCHEN'));

//   fireEvent.click(getOnlyVisible('Reset'));
//   fireEvent.click(getOnlyVisible('Family'));
//   fireEvent.click(getOnlyVisible('TRAVEL'));
// });

// test('Category Hobbies Use', () => {
//   render(<App />);
//   fireEvent.click(getOnlyVisible('Hobbies'));
//   fireEvent.click(getOnlyVisible('PLANTING'));

//   fireEvent.click(getOnlyVisible('Reset'));
//   fireEvent.click(getOnlyVisible('Hobbies'));
//   fireEvent.click(getOnlyVisible('CLIMBING'));
// });
