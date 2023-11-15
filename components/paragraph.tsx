interface ParagraphProps {
    text: String;
}

const Paragraph = ({
    text
}: ParagraphProps) => {
    return (
      <div>
        <p className="text-sm text-muted-foreground pb-4">{text}</p>
      </div>
    );
}
 
export default Paragraph;