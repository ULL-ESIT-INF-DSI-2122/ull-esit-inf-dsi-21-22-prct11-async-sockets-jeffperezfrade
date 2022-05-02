
export type Colors = 'yellow' | 'blue' | 'red' | 'blue';

export class Note {
  private _user: string;
  private _title: string;
  private _body: string;
  private _color: Colors;

  constructor(
      user: string,
      title: string,
      body: string,
      color: Colors,
  ) {
    this._user = user;
    this._title = title;
    this._body = body;
    this._color = color;
  }

  get user(): string {
    return this._user;
  }

  get title(): string {
    return this._title;
  }

  get body(): string {
    return this._body;
  }

  get color(): Colors {
    return this._color;
  }
}
