import { Color } from '@/utils/colors';
import { NothingFound } from '@/public/illustrations/nothing-found';

const Custom404 = () => (
	<div className='mt-4 flex-1 items-center justify-start'>
		<div className='text-center'>
			<NothingFound className='mx-auto mb-2' width={200} height={180} />
			<h1 color={Color.gray}>Nothing found, try looking for something else</h1>
		</div>
	</div>
)

export default Custom404
