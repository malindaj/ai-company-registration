interface SubHeadingProps {
    text: String;
}

const SubHeading = ({
    text
}: SubHeadingProps) => {
    return (
      <div>
        <h2 className="text-xl font-bold py-2">{text}</h2>
      </div>
    );
}
 
export default SubHeading;