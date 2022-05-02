import { cloneElement } from "react";

interface SkipLinkProperties {
  className: string;
  children: React.ReactElement;
  skipTo: string;
}

const SkipLink: React.FC<SkipLinkProperties> = (props) => {
  const onClick = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const container: HTMLElement | null = document.querySelector(props.skipTo);

    if (container) {
      container.tabIndex = -1;
      container.focus();
      setTimeout(() => container.removeAttribute("tabindex"), 1000);
    }
  };

  return cloneElement(props.children, { onClick, className: props.className });
};

export default SkipLink;
