import { useParams } from "react-router-dom";


export default function DetailsPage() {
	let params=useParams()
	console.log(params.roomId)
	return (
		<>
			<div>DetailsPage</div>

		</>
	);
}
