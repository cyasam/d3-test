import { rest } from 'msw';
import usdtry from './usd-try.json';

export const handlers = [
  rest.get(
    'https://api.apilayer.com/exchangerates_data/timeseries',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(usdtry));
    }
  ),
];
