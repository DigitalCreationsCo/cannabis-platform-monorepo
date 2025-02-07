"use client"
import { enableOverlays, type HistoryAdapterNavigate } from '@sanity/overlays';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function VisualEditing() {
	const router = useRouter();
	const path = usePathname()
	const routerRef = useRef(router);
	const [navigate, setNavigate] = useState<
		HistoryAdapterNavigate | undefined
	>();

	useEffect(() => {
		routerRef.current = router;
	}, [router]);
	useEffect(() => {
		const disable = enableOverlays({
			history: {
				subscribe: (navigate) => {
					setNavigate(() => navigate);
					return () => setNavigate(undefined);
				},
				update: (update) => {
					switch (update.type) {
						case 'push':
							return routerRef.current.push(update.url);
						case 'pop':
							return routerRef.current.back();
						case 'replace':
							return routerRef.current.replace(update.url);
						default:
							throw new Error(`Unknown update type: ${update.type}`);
					}
				},
			},
		});
		return () => disable();
	}, []);
	useEffect(() => {
		if (navigate && router) {
			navigate({ type: 'push', url: path });
		}
	}, [navigate, router, path]);

	return null;
}
