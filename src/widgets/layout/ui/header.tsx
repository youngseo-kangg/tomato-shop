import { Link } from "@shared/i18n";
import { getTranslations } from "next-intl/server";

import { LanguageSwitcher } from "./language-switcher";

/**
 * Atomic 관점의 template 영역 → widgets/layout. 여러 영역(브랜드/네비/로케일)을 조합.
 */
export async function Header() {
	const t = await getTranslations("common");

	return (
		<header className="border-b border-foreground/10">
			<div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
				<Link href="/" className="text-lg font-semibold tracking-tight">
					{t("brand")}
				</Link>
				<div className="flex items-center gap-4">
					<Link
						href="/products"
						className="text-sm text-foreground/70 hover:text-foreground"
					>
						{t("viewDetail")}
					</Link>
					<LanguageSwitcher />
				</div>
			</div>
		</header>
	);
}
