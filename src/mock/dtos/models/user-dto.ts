/* tslint:disable */
/* eslint-disable */
import { IsoDateDto } from '../models/iso-date-dto';
import { IsoDateWithTimeDto } from '../models/iso-date-with-time-dto';
import { UuidDto } from '../models/uuid-dto';
export interface UserDto {
  "creationDate": IsoDateWithTimeDto;
  "firstname": string;
  "id": UuidDto;
  "lastname": string;
  "updateDate"?: IsoDateWithTimeDto;
  "year": IsoDateDto;
}

