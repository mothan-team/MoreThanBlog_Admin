export const ImageElement = props => {
  return (
    <div {...props.attributes} contentEditable={false}>
      <img src={props.element.url} alt={props.element.alt} />
      {props.children}
    </div>
  );
};
