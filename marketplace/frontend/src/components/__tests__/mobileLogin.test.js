import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import '@testing-library/jest-dom';
import {setNarrow}
from './common';
import App from '../App';

const URL = '/v0/category';
const url = '/v0/listing';
const urlC = '/v0/listing/Vehicles';
const urlCS = '/v0/listing/Vehicles/Sedan';

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
      'category': 'Vehicles',
      'create_user': 'King',
      'create_time': '2021-12-04T01:06:09.753Z',
      'replies': '',
      'subcategory': 'Sedan'},
    ]));
  }),
  rest.get(urlC, (req, res, ctx) => {
    return res(ctx.json([{'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      'name': 'coat',
      'price': '$400',
      'longitude': '17.98765',
      'latitude': '-4.87654',
      'img_url': 'https://robohash.org/earumnonfacilis.png?size=50x50&set=set1',
      'category': 'Vehicles',
      'create_user': 'King',
      'create_time': '2021-12-04T01:06:09.753Z',
      'replies': '',
      'subcategory': 'Sedan'},
    ]));
  }),
  rest.get(urlCS, (req, res, ctx) => {
    return res(ctx.json([{'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      'name': 'coat',
      'price': '$400',
      'longitude': '17.98765',
      'latitude': '-4.87654',
      'img_url': 'https://robohash.org/earumnonfacilis.png?size=50x50&set=set1',
      'category': 'Vehicles',
      'create_user': 'King',
      'create_time': '2021-12-04T01:06:09.753Z',
      'replies': '',
      'subcategory': 'Sedan'},
    ]));
  }),
);

// rest.post(URl, (req, res, ctx) => {
//   return res((res) => {
//     res.ok = true;
//     ctx.json({
//       'name': 'test',
//       'accessToken': 'ass',
//     });
//   });
// }),

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Mobile Login success test', async () => {
  fetch = jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        json: () => ({
          'name': 'test',
          'accessToken': 'ass',
        }),
      });
    });
  });
  render(<App />);
  setNarrow();
  fireEvent.click(screen.getByTestId('header1'));
  const inputEl = screen.getByTestId('login1');
  fireEvent.change(inputEl, {target: {value: 'abc@gmail.com'}});
  const inputEle = screen.getByTestId('loginPass1');
  fireEvent.change(inputEle, {target: {value: 'abc'}});
  fireEvent.click(screen.getByTestId('login2'));
  fireEvent.click(await waitFor(() => screen.getByTestId('header2')));
  // fireEvent.click(screen.getByTestId('header2'));
});

test('Mobile Login fail test', async () => {
  fetch = jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: false,
      });
    });
  });
  render(<App />);
  setNarrow();
  fireEvent.click(screen.getByTestId('header1'));
  const inputEl = screen.getByTestId('login1');
  fireEvent.change(inputEl, {target: {value: 'abc@gmail.com'}});
  const inputEle = screen.getByTestId('loginPass1');
  fireEvent.change(inputEle, {target: {value: 'abc'}});
  fireEvent.click(screen.getByTestId('login2'));
  fireEvent.click(screen.getByTestId('login3'));
  fireEvent.click(screen.getByTestId('header1'));
  fireEvent.click(screen.getByTestId('login4'));
  userEvent.type(screen.getByTestId('new user'), 'abc');
  userEvent.type(screen.getByTestId('new password'), 'abc');
  fireEvent.click(screen.getByTestId('login5'));
  fireEvent.click(screen.getByTestId('login6'));
});
