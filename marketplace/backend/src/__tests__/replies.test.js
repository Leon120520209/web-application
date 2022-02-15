import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import '@testing-library/jest-dom';
import {setWide, setNarrow}
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

test('Replies Clickable', async () => {
  render(<App />);
  setWide();
  const inputEl = await waitFor(() => screen.getByText('coat'));
  await waitFor(() => fireEvent.click(inputEl));
  // const inputEle = screen.getByTestId('reply input');
  const inputEle = screen.getByTestId('reply input');
  fireEvent.change(inputEle, {target: {value: 'abc'}});
  // fireEvent.change(inputEle, {target: {value: 'abc'}});
  // await waitFor(() => screen.getByText('abc'));
  const inputElem = screen.getByTestId('send button');
  userEvent.click(inputElem);
  const inputElement = screen.getByTestId('reply close');
  userEvent.click(inputElement);
});

test('Mobile Replies Clickable', async () => {
  render(<App />);
  setNarrow();
  const inputEl = await waitFor(() => screen.getByText('coat'));
  await waitFor(() => fireEvent.click(inputEl));
  const inputEle = screen.getByTestId('reply input');
  fireEvent.change(inputEle, {target: {value: 'abc'}});
  const inputElem = screen.getByTestId('send button');
  userEvent.click(inputElem);
  const inputElement = screen.getByTestId('reply close');
  userEvent.click(inputElement);
});
