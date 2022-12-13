// import SearchIcon from 'components/icons/search';
import { Icons } from 'shared-ui';
import { twMerge } from 'tailwind-merge';

// export const SearchResultCard = styled(Card)(() => ({
//   zIndex: 99,
//   top: "100%",
//   width: "100%",
//   position: "absolute",
//   paddingTop: "0.5rem",
//   paddingBottom: "0.5rem",
// }));

function SearchBar() {
    return (
        <div
            className={twMerge(
                'items-center',
                'bg-white',
                'flex',
                'flex-row',
                'space-x-2',
                'w-full',
                'px-2',
                'py-2',
                'mx-4',
                'shadow-md',
                'outline-none',
                'lg:w-1/2',
                'wh-10'
            )}
        >
            <Icons.Search height={20} width={20} />
            <input className="outline-none w-full" placeholder="Search" />
        </div>
    );
}

export default SearchBar;
