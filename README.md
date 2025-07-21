# PokeSmuggler Inter-Galactic Fleet Builder

![](images/pokesmuggler.jpg)

The Pokemon and Star Wars universes have collided in a cruel, sick twist on the Big Bang theory. Chaos ensues. The war among the Galactic Empire and the Rebel alliance fades to black as Pokemon run rampant throughout a universe already filled with non-human creatures.

Anything resembling a sophisticate economy has become a thing of the past. The final, desperate days of the Galactic Credit are behind you. Out here on the battered rim-worlds and the tangled hyperlanes of the new, blended galaxy, only one commodity draws danger, excitement, and fortune in equal measure...


***Pokémon.***

From Coruscant’s neon underlevels to Pallet Town’s newly-arrived hovercantinas, brokers trade Squirtles for spice, Charizards for blasters, and a single elusive Mew for the promise of a star destroyer’s allegiance. But the galaxy is a maze of blockades and would-be lawmen. From Galarian bounty hunters in Mandalorian armor, to Rocket Team ISB agents with heavy stun batons and illicit Dittos.

You saw your chance. As a small-timer out of Mos Celadon, with nothing but debts and dreams, you built a crew. Your team: A surly Wookiee tech with a knack for Pokéballs, an ex-Galactic grunt with a Blastoise armored for breaching, and your own cunning.

Now, you're backed by the best fleet-planning tool in the galaxy: the **PokeSmuggler Inter-Galactic Fleet Builder.**

### User Stories
As a PokeSmuggler, I want to know what vehicles I need for a given set of pokemon that I need to smuggle.

### How to deploy

```bash
azcopy sync "./src" "https://<storage-account>.blob.core.windows.net/%24web?<sas-token>" --recursive --delete-destination=true
```
