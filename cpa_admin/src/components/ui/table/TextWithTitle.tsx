export interface TextWithTitleProps {
  title: string;
  text: string;
}

export function TextWithTitle({ text, title }: TextWithTitleProps) {
  return (
    <p>
      <strong>{title}: </strong>
      {text}
    </p>
  );
}
