"use strict";
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await SpotImage.bulkCreate([
			{
				spotId: 1,
				url: "https://i.ytimg.com/vi/MfCgkUPH6TQ/hq720.jpg",
				preview: true,
			},
			{
				spotId: 1,
				url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/f19f539d-27f0-4511-9282-b2462de90ec2/ddgozsv-f9aa8bd9-6bc4-4a19-8ab2-6ebcc8e0f1a1.png",
				preview: false,
			},
			{
				spotId: 1,
				url: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/b/bd/BotW_Hyrule_Castle_Close_Up.png",
				preview: false,
			},
			{
				spotId: 1,
				url: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/12/breath-of-the-wild-mod-renovates-hyrule-castle.jpg",
				preview: false,
			},
			{
				spotId: 1,
				url: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/b/b4/SanctumTotK.png",
				preview: false,
			},
			{
				spotId: 2,
				url: "https://i.pinimg.com/originals/92/ad/c8/92adc8206053a61a127a0376ca3bfc07.jpg",
				preview: true,
			},
			{
				spotId: 2,
				url: "https://static.wikia.nocookie.net/supermariobrosfilm/images/7/76/Mushroomkingdombirdseyeview.png",
				preview: false,
			},
			{
				spotId: 2,
				url: "https://i.kinja-img.com/image/upload/c_fit,q_60,w_1315/e05ef7a95bd52a5913fbde6d056337ab.jpg",
				preview: false,
			},
			{
				spotId: 2,
				url: "https://static1.moviewebimages.com/wordpress/wp-content/uploads/2022/11/peach-mario-key-art.jpg",
				preview: false,
			},
			{
				spotId: 2,
				url: "https://static.wikia.nocookie.net/mario/images/4/40/MushroomKingdom.png",
				preview: false,
			},
			{
				spotId: 3,
				url: "https://www.pcgamesn.com/wp-content/sites/pcgamesn/2021/08/skyrim-whiterun.jpg",
				preview: true,
			},
			{
				spotId: 3,
				url:"https://assetsio.reedpopcdn.com/skyrim-houses-how-to-buy-houses-in-whiterun-windhelm-riften-solitude-markarth-147764864274.jpg",
				preview: false,
			},
			{
				spotId: 3,
				url:"https://i.ytimg.com/vi/bXmvJyxT6rA/maxresdefault.jpg",
				preview: false,
			},
			{
				spotId: 3,
				url:"https://1.bp.blogspot.com/-2Q_C-2metqk/VbutEqEORFI/AAAAAAAABSQ/sBf7VhHpH94/s1600/sunrise_at_whiterun_by_terridol-d5kmkc3.jpg",
				preview: false,
			},
			{
				spotId: 3,
				url:"https://i.ytimg.com/vi/fWMpBIPAIp8/maxresdefault.jpg",
				preview: false,
			},
			{
				spotId: 4,
				url: "https://images.launchbox-app.com/046bc269-667e-4c83-8d4e-183f0b9ac2b9.jpg",
				preview: true,
			},
			{
				spotId: 4,
				url: "https://i.pinimg.com/originals/38/5c/55/385c55393dae66da4f8906c0711f26c1.jpg",
				preview: false,
			},
			{
				spotId: 4,
				url: "https://i.pinimg.com/736x/9f/1e/22/9f1e2230af26f51190b1d25b6555b468.jpg",
				preview: false,
			},
			{
				spotId: 4,
				url: "https://cdnb.artstation.com/p/assets/images/images/022/860/707/large/joao-sergio-zebes.jpg",
				preview: false,
			},
			{
				spotId: 4,
				url: "https://cdn.wikimg.net/en/metroidwiki/images/a/a8/Zebes_sm_Screenshot.png",
				preview: false,
			},
			{
				spotId: 5,
				url: "https://i.pinimg.com/originals/88/8b/df/888bdfb3dd63dae2034d84038f1f0ee8.jpg",
				preview: true,
			},
			{
				spotId: 5,
				url: "https://static.wikia.nocookie.net/residentevil/images/9/9c/Raccoonrain.jpg",
				preview: false,
			},
			{
				spotId: 5,
				url: "https://static.wikia.nocookie.net/residentevil/images/5/53/Raccoon_City_Incident_2020_Remake.jpg",
				preview: false,
			},
			{
				spotId: 5,
				url: "https://images.squarespace-cdn.com/content/v1/5f6cf1a893e35255d4d7e89d/1636659466710-EFLEUKZJ3U8QF1TF46H8/2021-11-11+11_37_02-RESIDENT+EVIL_+WELCOME+TO+RACCOON+CITY+-+Production+Vignette+-+YouTube.png",
				preview: false,
			},
			{
				spotId: 5,
				url: "https://static.wikia.nocookie.net/residentevil/images/8/86/Bg_re3.jpg",
				preview: false,
			},
			{
				spotId: 6,
				url: "https://static.tweaktown.com/news/7/1/71096_90_final-fantasy-7-remakes-midgar-is-city-made-into-world_full.png",
				preview: true,
			},
			{
				spotId: 6,
				url: "https://static.wikia.nocookie.net/finalfantasy/images/2/27/Midgar-construction.jpg",
				preview: false,
			},
			{
				spotId: 6,
				url: "https://cdn.wccftech.com/wp-content/uploads/2019/08/FFVII-RE-Concept-Art-740x391.jpg",
				preview: false,
			},
			{
				spotId: 6,
				url: "https://i.pinimg.com/736x/6f/66/42/6f6642719a3eacb75bada3a2593a6edb.jpg",
				preview: false,
			},
			{
				spotId: 6,
				url: "https://static.wikia.nocookie.net/finalfantasy/images/c/c0/Sector_7_Slums_from_FFVII_Remake.jpg",
				preview: false,
			},
			{
				spotId: 7,
				url: "https://assets-prd.ignimgs.com/2022/10/19/returntosilenthill-blog-1666185918025.jpg",
				preview: true,
			},
			{
				spotId: 7,
				url: "https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-hallway-in-a-building-with-lots-dark-lights-image_2566798.jpg",
				preview: false,
			},
			{
				spotId: 7,
				url: "https://cutewallpaper.org/22/resident-evil-7-wallpapers/1740525890.jpg",
				preview: false,
			},
			{
				spotId: 7,
				url: "https://pbs.twimg.com/media/CKJjiCVUwAAFX6x.jpg",
				preview: false,
			},
			{
				spotId: 7,
				url: "https://images2.alphacoders.com/204/204370.jpg",
				preview: false,
			},
			{
				spotId: 8,
				url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/dark-souls-2/3/3e/Majula1.jpg",
				preview: true,
			},
			{
				spotId: 8,
				url: "https://static.wikia.nocookie.net/darksouls/images/d/d8/Majula_swords.png",
				preview: false,
			},
			{
				spotId: 8,
				url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/dark-souls-2/0/0d/Dark-souls-ii-31.jpg",
				preview: false,
			},
			{
				spotId: 8,
				url: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/12/majula-featured.jpg",
				preview: false,
			},
			{
				spotId: 8,
				url: "https://i.pinimg.com/originals/17/4c/74/174c74aa8c9e3c862bf6795885b9e302.jpg",
				preview: false,
			},
			{
				spotId: 9,
				url: "https://files.ekmcdn.com/6d7106/images/bioshock-welcome-to-rapture-1199-p.jpg",
				preview: true,
			},
			{
				spotId: 9,
				url: "https://i.ytimg.com/vi/aMF9bEVACxs/maxresdefault.jpg",
				preview: false,
			},
			{
				spotId: 9,
				url: "https://www.wallpaperup.com/uploads/wallpapers/2014/01/20/232785/72c9409c4c78de4f26946357bcce8348-700.jpg",
				preview: false,
			},
			{
				spotId: 9,
				url: "https://i.pinimg.com/originals/4d/c3/27/4dc3273dacc6566da1843150a9d06a64.jpg",
				preview: false,
			},
			{
				spotId: 9,
				url: "https://static.wikia.nocookie.net/bioshock/images/6/6c/Kashmir_Atlas_downstairs.png",
				preview: false,
			},
			{
				spotId: 10,
				url: "https://pbs.twimg.com/media/FblbfOZXgAAgCGd.jpg",
				preview: true,
			},
			{
				spotId: 10,
				url: "https://static.wikia.nocookie.net/pokemon/images/7/78/Orsay_City.png",
				preview: false,
			},
			{
				spotId: 10,
				url: "https://static.wikia.nocookie.net/pokemonfireash/images/7/78/Kanto.png",
				preview: false,
			},
			{
				spotId: 10,
				url: "https://i.pinimg.com/736x/73/b7/d0/73b7d07336ffecfa3a9a3443af7043b4.jpg",
				preview: false,
			},
			{
				spotId: 10,
				url: "https://static.wikia.nocookie.net/pokemonfireash/images/d/da/Kanto_anime.png",
				preview: false,
			},
			{
				spotId: 11,
				url: "https://s2.megabrandsmedia.com/2018/07/18/16/07/10/r/1000x750/xm5HlG1DXz1531944430.jpeg",
				preview: true,
			},
			{
				spotId: 11,
				url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/halo-4/c/c2/UNSC_Infinity.png?width=1280",
				preview: false,
			},
			{
				spotId: 11,
				url: "https://i.pinimg.com/originals/55/28/fe/5528fecc07fe1eea32b4b691a30bcea0.jpg",
				preview: false,
			},
			{
				spotId: 11,
				url: "https://e0.pxfuel.com/wallpapers/451/156/desktop-wallpaper-unsc-infinity-by-zhangx-halo-art-in-2019-futuristic-art.jpg",
				preview: false,
			},
			{
				spotId: 11,
				url: "https://wpassets.halowaypoint.com/wp-content/2022/10/UNSC-Infinity-Full-Moon.jpg",
				preview: false,
			},
			{
				spotId: 12,
				url: "https://images.gamebanana.com/img/ss/wips/604cc3145db25.jpg",
				preview: true,
			},
			{
				spotId: 12,
				url: "https://static.wikia.nocookie.net/sonic-the-hedgehog-multiverse/images/e/e4/Sonic_generations_green_hill_photomanipulation_by_deverexdrawer_dbj318j-fullview.jpg",
				preview: false,
			},
			{
				spotId: 12,
				url: "https://static.wikia.nocookie.net/sonic/images/5/53/Sonic_Generations_-_Concept_artwork_001.png",
				preview: false,
			},
			{
				spotId: 12,
				url: "https://cdn.vox-cdn.com/thumbor/OB9fZ4UXtPUf3y19UavxOm3VplQ=/0x0:1200x675/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/54465367/C_RgOHqUIAAGcx3.0.jpg",
				preview: false,
			},
			{
				spotId: 12,
				url: "https://static.wikia.nocookie.net/sonic/images/8/83/Green_Hill_Zone_Sonic_Prime.png",
				preview: false,
			},
			{
				spotId: 13,
				url: "https://ssb.wiki.gallery/images/thumb/2/24/SSBU-Shadow_Moses_Island_2.jpg/1200px-SSBU-Shadow_Moses_Island_2.jpg",
				preview: true,
			},
			{
				spotId: 13,
				url: "https://static.wikia.nocookie.net/metalgear/images/4/40/Hind_d.png",
				preview: false,
			},
			{
				spotId: 13,
				url: "https://static.wikia.nocookie.net/metalgear/images/8/88/MGA2ShadowMoses.png",
				preview: false,
			},
			{
				spotId: 13,
				url: "https://www.metalgearinformer.com/wp-content/uploads/2013/10/MGS4-Shadow-Moses-Nuclear-Warhead-Storage.jpg",
				preview: false,
			},
			{
				spotId: 13,
				url: "https://i.pinimg.com/736x/b4/74/1b/b4741b75a3f05df6bf292a6c23ce3bed.jpg",
				preview: false,
			},
			{
				spotId: 14,
				url: "https://i.ytimg.com/vi/kHtuZiW6dPw/maxresdefault.jpg",
				preview: true,
			},
			{
				spotId: 14,
				url: "https://static.wikia.nocookie.net/bloodborne/images/2/26/Yharnam.jpg",
				preview: false,
			},
			{
				spotId: 14,
				url: "https://4.bp.blogspot.com/-4gyFogcex9k/Wc9XMbnztFI/AAAAAAAATLE/bGSIdLNovRcMsosFpIFVOWF4uF5n0gOxACLcBGAs/s1600/Great%2BBridge.png",
				preview: false,
			},
			{
				spotId: 14,
				url: "https://i.pinimg.com/originals/3b/15/f7/3b15f779411b2f4ea1a7761fb65f8742.jpg",
				preview: false,
			},
			{
				spotId: 14,
				url: "https://i.pinimg.com/736x/23/05/40/2305401604e7d6c474f6b4e38785e848.jpg",
				preview: false,
			},
			{
				spotId: 15,
				url: "https://i.pinimg.com/originals/36/2a/7b/362a7b513051d613419e5a99926d5454.png",
				preview: true,
			},
			{
				spotId: 15,
				url: "https://i.ytimg.com/vi/UxmctWUSRoA/maxresdefault.jpg",
				preview: false,
			},
			{
				spotId: 15,
				url: "https://media.moddb.com/images/articles/1/302/301956/20220115122511_1.jpg",
				preview: false,
			},
			{
				spotId: 15,
				url: "https://developer.valvesoftware.com/w/images/thumb/5/56/City17_courtyard.jpg/500px-City17_courtyard.jpg",
				preview: false,
			},
			{
				spotId: 15,
				url: "https://culturedvultures.com/wp-content/uploads/2017/06/City17.jpg",
				preview: false,
			},
			{
				spotId: 16,
				url: "https://wiseguyjukebox.files.wordpress.com/2015/06/maxresdefault.jpg",
				preview: true,
			},
			{
				spotId: 16,
				url: "https://staticg.sportskeeda.com/editor/2021/07/e5cd3-16276552690987-800.jpg",
				preview: false,
			},
			{
				spotId: 16,
				url: "https://i.ytimg.com/vi/AnHiZeFm7Fs/maxresdefault.jpg",
				preview: false,
			},
			{
				spotId: 16,
				url: "https://www.cheatcc.com/wp-content/uploads/2023/08/los-santos-2.jpg",
				preview: false,
			},
			{
				spotId: 16,
				url: "https://w0.peakpx.com/wallpaper/464/552/HD-wallpaper-sunset-scenery-beach-grand-theft-auto-gta-gta5.jpg",
				preview: false,
			},
			
		]);
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "SpotImages";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				preview: { [Op.in]: [true] },
			},
			{}
		);
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
