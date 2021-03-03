import * as mongoose from 'mongoose';
import { config } from '../../myConfig';
export const DatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb://${config.mongoServer}/${config.dataBase}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
  },
];
