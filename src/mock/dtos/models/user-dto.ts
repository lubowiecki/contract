/* tslint:disable */
/* eslint-disable */
import { IsoDateDto } from './iso-date-dto';
import { IsoDateWithTimeDto } from './iso-date-with-time-dto';
import { UuidDto } from './uuid-dto';
export interface UserDto {
  "creationDate": IsoDateWithTimeDto;
  "firstname": string;
  "id": UuidDto;
  "lastname": string;
  "updateDate"?: IsoDateWithTimeDto;
  "year": IsoDateDto;
}

