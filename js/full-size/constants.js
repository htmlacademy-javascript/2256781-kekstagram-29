const COMMENT_PORTION = 5;

const COMMENT_TEMPLATE = `
  <li class="social__comment">
    <img
      class="social__picture"
      src="{{аватар}}"
      alt="{{имя комментатора}}"
      width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
  </li>
`;

export { COMMENT_PORTION, COMMENT_TEMPLATE };
