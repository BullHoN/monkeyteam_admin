import Link from 'next/link';

export default function Component() {
	return (
		<div className="p-4 sm:ml-64">
			<div className="container mx-auto py-10">
				<h1 className="text-3xl font-semibold text-center mb-8">
					Welcome to Admin Panel
				</h1>

				<div className="flex justify-center space-x-6">
					<Link
						href="/licence"
						className="bg-slate-900 p-4 rounded-md text-white"
					>
						Manage Licences
					</Link>
					<Link
						href="/history"
						className="bg-slate-900 p-4 rounded-md text-white"
					>
						View User Search History
					</Link>
				</div>

				<div className="mt-8 text-center text-gray-600">
					<p>Instructions:</p>
					<p className="mt-2">
						- Go to{' '}
						<Link href="/licence" className="text-blue-600">
							/licence
						</Link>{' '}
						for licence management.
					</p>
					<p className="mt-2">
						- Go to{' '}
						<Link href="/history" className="text-blue-600">
							/history
						</Link>{' '}
						to watch user search history.
					</p>
				</div>
			</div>
		</div>
	);
}
