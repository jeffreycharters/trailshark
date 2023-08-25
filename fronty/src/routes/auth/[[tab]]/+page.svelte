<script lang="ts">
	import { enhance } from "$app/forms"
	import { Button } from "$lib/components/ui/button"
	import * as Card from "$lib/components/ui/card"
	import { Input } from "$lib/components/ui/input"
	import { Label } from "$lib/components/ui/label"
	import * as Tabs from "$lib/components/ui/tabs"
	import { superForm } from "sveltekit-superforms/client"
	import type { PageData } from "./$types"
	import { page } from "$app/stores"
	import TextField from "$lib/components/forms/TextField.svelte"
	import * as Alert from "$lib/components/ui/alert"
	import { Icon } from "@steeze-ui/svelte-icon"
	import { InformationCircle, WrenchScrewdriver } from "@steeze-ui/heroicons"
	import { slide } from "svelte/transition"

	export let data: PageData

	const form = superForm(data.form)
	const message = form.message

	$: tab = $page.params.tab ?? "login"
</script>

<Tabs.Root value={tab}>
	<Tabs.List class="mt-2 grid w-full grid-cols-2">
		<Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
		<Tabs.Trigger value="login">Login</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="signup">
		<Card.Root>
			<form method="POST" use:enhance>
				<Card.Header>
					<Card.Title>Sign up</Card.Title>
					<Card.Description class="space-y-4">
						<div>Cave to the peer pressure.</div>
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					{#if $message}
						<div transition:slide={{ duration: 200 }}>
							<Alert.Root class="text-destructive border-destructive border-2">
								<Icon
									src={WrenchScrewdriver}
									class="stroke-destructive my-auto h-5 w-5 stroke-[1.5]" />
								<Alert.Title>That didn't work?!</Alert.Title>
								<Alert.Description>
									Because:
									<span class="font-semibold">{$message}</span>
								</Alert.Description>
							</Alert.Root>
						</div>
					{/if}

					<Alert.Root class="text-muted-foreground bg-muted mb-2 border-slate-300">
						<Icon
							src={InformationCircle}
							class="stroke-muted-foreground my-auto h-5 w-5 stroke-[1.75]" />
						<Alert.Title>Username rules</Alert.Title>
						<Alert.Description>
							2-20 characters: letters, numbers, underscores. Change anytime.
						</Alert.Description>
					</Alert.Root>

					<TextField {form} field="username" name="username" label="Username" />
					<div class="space-y-1">
						<TextField {form} field="email" name="email" label="Email" type="email" />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button type="submit" class="w-full">Submit</Button>
				</Card.Footer>
			</form>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="login">
		<Card.Root>
			<Card.Header>
				<Card.Title>Password</Card.Title>
				<Card.Description>
					Change your password here. After saving, you'll be logged out.
				</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="space-y-1">
					<Label for="current">Current password</Label>
					<Input id="current" type="password" />
				</div>
				<div class="space-y-1">
					<Label for="new">New password</Label>
					<Input id="new" type="password" />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button>Save password</Button>
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
