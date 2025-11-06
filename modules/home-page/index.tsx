"use client"

import DeleteAccount from "@/components/account-deletion";
import WrapperContainer from "@/components/wrapper/wrapper-container";

export default function HomePage() {

	return (
		<WrapperContainer>
			<DeleteAccount className="flex-row" />
		</WrapperContainer>
	)
}
