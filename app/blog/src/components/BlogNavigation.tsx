import { selectBlogsByTag, selectBlogTags } from '@cd/core-lib';
import { type ArticleType } from '@cd/data-access';
import { NavLink, GrasSignature, type NavLinkType } from '@cd/ui-lib';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

interface BlogNavProps {
	tags: ArticleType[];
}
const BlogNavigation = () => {
	const { pathname } = useRouter();
	// const tags = useSelector(selectBlogTags);

	const tags = [
		'all',
		'events',
		'press',
		'announcements',
		'blog',
		'podcast',
		'video',
	];
	const navLinkGroups: NavLinkType[] = tags.map((tag) => ({
		href: `/${tag}`,
		title: tag,
		enabled: true,
	}));

	return (
		<div>
			<GrasSignature className="text-yellow">read our blog</GrasSignature>
			<ul className="tabs">
				{renderNavLinkAndSubLinks(navLinkGroups, pathname)}
			</ul>
		</div>
	);
};

export default BlogNavigation;

function renderNavLinkAndSubLinks(
	navLinkGroup: NavLinkType[],
	path: string,
): any[] {
	return navLinkGroup
		.filter((link) => link.enabled)
		.map((link) => (
			// isArray(item) ? (
			// 	renderNavLinkAndSubLinks(item)
			// ) :
			<NavLink
				className="tab"
				key={link.title}
				link={link}
				isActive={path.startsWith(link.href)}
			>
				{link.title}
			</NavLink>
		));
}
