/**
 * Different note colors.
 */
export type Colors = 'yellow' | 'blue' | 'red' | 'blue';
/**
 * This class stands for the notes sended.
 */
export class Note {
  /**
   * Attributes.
   */
  private _user: string;
  private _title: string;
  private _body: string;
  private _color: Colors;
  /**
   * Note class constructor.
   * @param user User name.
   * @param title Note title.
   * @param body Note body (information inside).
   * @param color Note color ('yellow' | 'blue' | 'red' | 'blue').
   */
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
  /**
   * User name getter.
   * @returns Note user name.
   */
  get user(): string {
    return this._user;
  }
  /**
   * Title getter.
   * @returns Note title.
   */
  get title(): string {
    return this._title;
  }
  /**
   * Body getter.
   * @returns Note body.
   */
  get body(): string {
    return this._body;
  }
  /**
   * Color getter.
   * @returns Note color.
   */
  get color(): Colors {
    return this._color;
  }
}
