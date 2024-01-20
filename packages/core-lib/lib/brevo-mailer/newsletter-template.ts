function buildNewsletterTemplate(
	subject: string,
	header: string,
	content: {
		title: string;
		excerpt: string;
		mainImage: string;
		footer: string;
		link: string;
	}[],
) {
	const formattedArticles = content.map((item) => articleMarkup(item)).join('');

	console.info('created formattedArticles..');
	console.info('building newsletter template..');
	return `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title></head><body>
	<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
	<meta content="IE=edge" http-equiv="X-UA-Compatible" />
	<meta content="telephone=no" name="format-detection" />
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<style emogrify="no" type="text/css">
	#outlook a { padding:0; } .ExternalClass { width:100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } table td { border-collapse: collapse; mso-line-height-rule: exactly; } .editable.image { font-size: 0 !important; line-height: 0 !important; } .nl2go_preheader { display: none !important; mso-hide:all !important; mso-line-height-rule: exactly; visibility: hidden !important; line-height: 0px !important; font-size: 0px !important; } body { width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; } img { outline:none; text-decoration:none; -ms-interpolation-mode: bicubic; } a img { border:none; } table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; } th { font-weight: normal; text-align: left; } *[class="gmail-fix"] { display: none !important; }</style>
	<style emogrify="no" type="text/css">
	@media (max-width: 600px) { .gmx-killpill { content: 'ϑ';} }</style>
	<style emogrify="no" type="text/css">
	@media (max-width: 600px) { .gmx-killpill { content: 'ϑ';} .r0-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 320px !important } .r1-i { background-color: #fff2da !important } .r2-c { box-sizing: border-box !important; text-align: center !important; valign: top !important; width: 100% !important } .r3-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 100% !important } .r4-i { padding-bottom: 20px !important; padding-left: 15px !important; padding-right: 15px !important; padding-top: 20px !important } .r5-c { box-sizing: border-box !important; display: block !important; valign: top !important; width: 100% !important } .r6-o { border-style: solid !important; width: 100% !important } .r7-i { padding-left: 0px !important; padding-right: 0px !important } .r8-c { box-sizing: border-box !important; padding-top: 15px !important; text-align: left !important; valign: top !important; width: 100% !important } .r9-c { box-sizing: border-box !important; text-align: center !important; width: 100% !important } .r10-i { font-size: 0px !important; padding-bottom: 15px !important; padding-left: 105px !important; padding-right: 105px !important; padding-top: 15px !important } .r11-c { box-sizing: border-box !important; width: 32px !important } .r12-o { border-style: solid !important; margin-right: 8px !important; width: 32px !important } .r13-i { padding-bottom: 5px !important; padding-top: 5px !important } .r14-o { border-style: solid !important; margin-right: 0px !important; width: 32px !important } .r15-c { box-sizing: border-box !important; text-align: left !important; valign: top !important; width: 100% !important } .r16-o { border-style: solid !important; margin: 0 auto 0 0 !important; width: 100% !important } .r17-i { padding-bottom: 15px !important; padding-top: 15px !important; text-align: center !important } .r18-i { background-color: #fff2da !important; padding-bottom: 20px !important; padding-left: 10px !important; padding-right: 10px !important; padding-top: 20px !important } .r19-i { padding-top: 15px !important; text-align: left !important } .r20-o { border-style: solid !important; margin-bottom: 0px !important; margin-top: 0px !important; width: 100% !important } .r21-c { box-sizing: border-box !important; padding-bottom: 0px !important; padding-top: 15px !important; text-align: left !important; valign: top !important; width: 100% !important } .r22-c { box-sizing: border-box !important; padding-bottom: 0px !important; padding-top: 15px !important; text-align: center !important; valign: top !important; width: 100% !important } .r23-c { box-sizing: border-box !important; padding-bottom: 15px !important; padding-top: 15px !important; text-align: left !important; valign: top !important; width: 100% !important } .r24-c { box-sizing: border-box !important; padding: 0 !important; text-align: center !important; valign: top !important; width: 100% !important } .r25-o { border-style: solid !important; margin: 0 auto 0 auto !important; margin-bottom: 15px !important; margin-top: 15px !important; width: 100% !important } .r26-i { padding: 0 !important; text-align: center !important } .r27-r { background-color: #14a33d !important; border-color: #14a33d !important; border-radius: 4px !important; border-width: 0px !important; box-sizing: border-box; height: initial !important; padding: 0 !important; padding-bottom: 12px !important; padding-top: 12px !important; text-align: center !important; width: 100% !important } .r28-i { background-color: #13622a !important; padding-bottom: 20px !important; padding-left: 15px !important; padding-right: 15px !important; padding-top: 20px !important } .r29-i { background-color: #13622a !important; padding-left: 0px !important; padding-right: 0px !important } .r30-i { color: #3b3f44 !important; padding-bottom: 0px !important; padding-top: 15px !important; text-align: center !important } .r31-i { color: #3b3f44 !important; padding-bottom: 0px !important; padding-top: 0px !important; text-align: center !important } .r32-i { color: #3b3f44 !important; padding-bottom: 15px !important; padding-top: 15px !important; text-align: center !important } .r33-i { padding-bottom: 15px !important; padding-left: 0px !important; padding-right: 0px !important; padding-top: 0px !important } .r34-c { box-sizing: border-box !important; text-align: center !important; valign: top !important; width: 129px !important } .r35-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 129px !important } body { -webkit-text-size-adjust: none } .nl2go-responsive-hide { display: none } .nl2go-body-table { min-width: unset !important } .mobshow { height: auto !important; overflow: visible !important; max-height: unset !important; visibility: visible !important; border: none !important } .resp-table { display: inline-table !important } .magic-resp { display: table-cell !important } }</style>
	<style type="text/css">
	p, h1, h2, h3, h4, ol, ul { margin: 0; } a, a:link { color: #14a33d; text-decoration: underline } .nl2go-default-textstyle { color: #3e3a3a; font-family: Arial; font-size: 18px; line-height: 1.5; word-break: break-word } .default-button { color: #ffffff; font-family: Arial; font-size: 16px; font-style: normal; font-weight: bold; line-height: 1.15; text-decoration: none; word-break: break-word } .default-heading1 { color: #3e3a3a; font-family: Tahoma; font-size: 36px; word-break: break-word } .default-heading2 { color: #3e3a3a; font-family: Tahoma; font-size: 32px; word-break: break-word } .default-heading3 { color: #3e3a3a; font-family: Tahoma; font-size: 24px; word-break: break-word } .default-heading4 { color: #3e3a3a; font-family: Tahoma; font-size: 18px; word-break: break-word } a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .no-show-for-you { border: none; display: none; float: none; font-size: 0; height: 0; line-height: 0; max-height: 0; mso-hide: all; overflow: hidden; table-layout: fixed; visibility: hidden; width: 0; }</style>
	<!--[if mso]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]-->
	<style type="text/css">
	a:link{color: #14a33d; text-decoration: underline;}</style>
	<table border="0" cellpadding="0" cellspacing="0" class="nl2go-body-table" role="presentation" style="background-color: #fff2da; width: 100%;" width="100%">
		<tbody>
			<tr>
				<td>
					<table align="center" border="0" cellpadding="0" cellspacing="0" class="r0-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
						<tbody>
							<tr>
								<td class="r1-i" style="background-color: #fff2da;" valign="top">
									<table align="center" border="0" cellpadding="0" cellspacing="0" class="r3-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
										<tbody>
											<tr>
												<td class="r4-i" style="padding-bottom: 20px; padding-top: 20px;">
													<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
														<tbody>
															<tr>
																<th class="r5-c" style="font-weight: normal;" valign="top" width="100%">
																	<table border="0" cellpadding="0" cellspacing="0" class="r6-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																		<tbody>
																			<tr>
																				<td class="r7-i" style="padding-left: 15px; padding-right: 15px;" valign="top">
																					<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																						<tbody>
																							<tr>
																								<td align="left" class="r8-c nl2go-default-textstyle" style="color: #3e3a3a; font-family: Arial; font-size: 18px; word-break: break-word; line-height: 1.5; padding-top: 15px; text-align: left; valign: top;">
																									<div>
																										<h1 class="default-heading1" style="margin: 0; color: #3e3a3a; font-family: Tahoma; font-size: 36px; word-break: break-word;">
																											<span style="font-family: 'Trebuchet ms', helvetica, sans-serif, arial; font-size: 36px;"><strong>${subject}</strong></span></h1>
																									</div>
																								</td>
																							</tr>
																							<tr>
																								<td align="left" class="r8-c nl2go-default-textstyle" style="color: #3e3a3a; font-family: Arial; font-size: 18px; word-break: break-word; line-height: 1; padding-top: 15px; text-align: left; valign: top;">
																									<div>
																										<p style="margin: 0;">
																											<span style="font-family: Arial; font-size: 22px;">${header}</span></p>
																									</div>
																								</td>
																							</tr>
																							<tr>
																								<td align="center" class="r9-c">
																									<table align="center" border="0" cellpadding="0" cellspacing="0" class="r3-o" role="presentation" style="table-layout: fixed; width: 570px;" width="570">
																										<tbody>
																											<tr>
																												<td valign="top">
																													<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																														<tbody>
																															<tr>
																																<td align="center" class="r9-c" style="display: inline-block;">
																																	<table align="center" border="0" cellpadding="0" cellspacing="0" class="r3-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																																		<tbody>
																																			<tr>
																																				<td class="r10-i" style="padding-bottom: 15px; padding-left: 249px; padding-right: 249px; padding-top: 15px;">
																																					<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																																						<tbody>
																																							<tr>
																																								<th class="r11-c mobshow resp-table" style="font-weight: normal;" width="40">
																																									<table border="0" cellpadding="0" cellspacing="0" class="r12-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																																										<tbody>
																																											<tr>
																																												<td class="r13-i" style="font-size: 0px; line-height: 0px; padding-bottom: 5px; padding-top: 5px;">
																																													<a href="https://twitter.com/gras_cannabis?utm_source=brevo&utm_campaign=Cannabis Insider Issue&utm_medium=email&utm_id=24" style="color: #14a33d; text-decoration: underline;" target="_blank"> <img border="0" src="https://creative-assets.mailinblue.com/editor/social-icons/rounded_colored/twitter_32px.png" style="display: block; width: 100%;" width="32" /></a></td>
																																												<td class="nl2go-responsive-hide" style="font-size: 0px; line-height: 1px;" width="8">
																																													</td>
																																											</tr>
																																										</tbody>
																																									</table>
																																								</th>
																																								<th class="r11-c mobshow resp-table" style="font-weight: normal;" width="32">
																																									<table border="0" cellpadding="0" cellspacing="0" class="r14-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																																										<tbody>
																																											<tr>
																																												<td class="r13-i" style="font-size: 0px; line-height: 0px; padding-bottom: 5px; padding-top: 5px;">
																																													<a href="https://www.instagram.com/grascannabis/?utm_source=brevo&utm_campaign=Cannabis Insider Issue&utm_medium=email&utm_id=24" style="color: #14a33d; text-decoration: underline;" target="_blank"> <img border="0" src="https://creative-assets.mailinblue.com/editor/social-icons/rounded_colored/instagram_32px.png" style="display: block; width: 100%;" width="32" /></a></td>
																																											</tr>
																																										</tbody>
																																									</table>
																																								</th>
																																							</tr>
																																						</tbody>
																																					</table>
																																				</td>
																																			</tr>
																																		</tbody>
																																	</table>
																																</td>
																															</tr>
																														</tbody>
																													</table>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</th>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
									<table align="center" border="0" cellpadding="0" cellspacing="0" class="r3-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
										<tbody>
											<tr>
												<td class="r4-i" style="padding-bottom: 20px; padding-top: 20px;">
													<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
														<tbody>
															<tr>
																<th class="r5-c" style="font-weight: normal;" valign="top" width="100%">
																	<table border="0" cellpadding="0" cellspacing="0" class="r6-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																		<tbody>
																			<tr>
																				<td class="r7-i" style="padding-left: 15px; padding-right: 15px;" valign="top">
																					<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																						<tbody>
																							<tr>
																								<td align="center" class="r2-c">
																									<table border="0" cellpadding="0" cellspacing="0" class="r3-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																										<tbody>
																											<tr>
																												<td style="font-size: 0px; line-height: 0px;">
																													<img border="0" src="https://img.mailinblue.com/6266786/images/content_library/original/658f741e5f655f0bfd3595b7.png" style="display: block; width: 100%;" width="100%" /></td>
																											</tr>
																										</tbody>
																									</table>
																								</td>
																							</tr>
																							<tr>
																								<td align="left" class="r15-c">
																									<table border="0" cellpadding="0" cellspacing="0" class="r16-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																										<tbody>
																											<tr>
																												<td align="center" class="r17-i nl2go-default-textstyle" style="color: #3e3a3a; font-family: Arial; font-size: 18px; word-break: break-word; line-height: 1; padding-bottom: 15px; padding-top: 15px; text-align: center;" valign="top">
																													<div>
																														<p style="margin: 0;">
																															Cannabis, Delivered</p>
																													</div>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</th>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
									<table align="center" border="0" cellpadding="0" cellspacing="0" class="r3-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
										<tbody>
											<tr>
												<td class="r4-i" style="padding-bottom: 20px; padding-top: 20px;">
													<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
														<tbody>
															<tr>
																<th class="r5-c" style="font-weight: normal;" valign="top" width="100%">
																	<table border="0" cellpadding="0" cellspacing="0" class="r6-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																		<tbody>
																			<tr>
																				<td class="r7-i" style="padding-left: 15px; padding-right: 15px;" valign="top">
																					<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																						<tbody>
																							<tr>
																								<td align="left" class="r15-c">
																									<table border="0" cellpadding="0" cellspacing="0" class="r16-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																										<tbody>
																											<tr>
																												<td align="center" class="r17-i nl2go-default-textstyle" style="color: #3e3a3a; font-family: Arial; font-size: 18px; word-break: break-word; line-height: 1; padding-bottom: 15px; padding-top: 15px; text-align: center;" valign="top">
																													<div>
																														<p style="margin: 0; text-align: justify;">
																															<span style="font-family: Arial, helvetica, sans-serif; font-size: 18px;">Hey, {{contact.COMPANY|default:'friend'}}!</span></p>
																														<p style="margin: 0; text-align: justify;">
																															</p>
																														<p style="margin: 0; text-align: justify;">
																															<span style="font-family: Arial, helvetica, sans-serif; font-size: 18px;">It's Bryant from Gras!</span></p>
																														<p style="margin: 0; text-align: justify;">
																															<br />
																															<span style="color: #4bbe6e; font-family: Arial, helvetica, sans-serif; font-size: 18px;">Gras helps dispensaries deliver to customers with secure, same-day delivery service, all with no extra effort from your staff. </span><span style="font-family: Arial, helvetica, sans-serif; font-size: 18px;">🚛</span><span style="color: #4bbe6e; font-family: Arial, helvetica, sans-serif; font-size: 18px;"> </span><span style="font-family: Arial, helvetica, sans-serif; font-size: 18px;">🌿💨</span><br />
																															<br />
																															<span style="font-family: Arial, helvetica, sans-serif; font-size: 18px;">This is Cannabis Insider, where we bring you updates from our team and the world of cannabis.</span></p>
																													</div>
																												</td>
																											</tr>
																										</tbody>
																									</table>
																								</td>
																							</tr>
																						</tbody>
																					</table>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</th>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
									<table align="center" border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
										<tbody>
											<tr>
												<td class="r3-i" style="background-color: #fff2da; padding-bottom: 20px; padding-top: 20px;">
													<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
														<tbody>
															<tr>
																<th class="r18-c" style="font-weight: normal;" valign="middle" width="100%">
																	<table border="0" cellpadding="0" cellspacing="0" class="r16-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																		<tbody>
																			<tr>
																				<td class="r19-i nl2go-default-textstyle" style="color: #3e3a3a; font-family: Arial; font-size: 18px; word-break: break-word; line-height: 1.5; padding-top: 15px; padding-left: 15px; padding-right: 15px;" valign="top">
																					<div>
																						<h3 class="default-heading3" style="margin: 0; color: #3e3a3a; font-family: Tahoma; font-size: 24px; word-break: break-word;">
																							<span style="color: #4bbe6e; font-family: Tahoma; font-size: 24px;">What's New from the World of Cannabis</span></h3>
																							</div>
																						</td>
																					</tr>
																				</tbody>
																			</table>
																		</th>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>${formattedArticles}<table align="center" border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
									<tbody>
										<tr>
											<td class="r3-i" style="background-color: #fff2da; padding-bottom: 20px; padding-top: 20px;">
												<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
													<tbody>
														<tr>
															<th class="r18-c" style="font-weight: normal;" valign="middle" width="100%">
																<table border="0" cellpadding="0" cellspacing="0" class="r19-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																	<tbody>
																		<tr>
																			<td class="r6-i" style="padding-left: 15px; padding-right: 15px;" valign="top">
																				<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%" width="100%">
																					<tbody>
																						<tr>
																							<td align="center" class="r1-c">
																								<table border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed;width: 100%" width="100%">
																									<tbody>
																										<tr>
																											<td align="left" class="r7-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-top: 15px; text-align: left;" valign="top">
																												<div>
																													<h3 class="default-heading3" style="margin: 0; color: #1f2d3d; font-family: tahoma,geneva,sans-serif,Arial; font-size: 24px; word-break: break-word;">
																														<span style="color: #4bbe6e;"><strong>What's New From Our Team</strong></span></h3>
																												</div>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																						<tr>
																							<td align="center" class="r1-c">
																								<table border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																									<tbody>
																										<tr>
																											<td align="left" class="r20-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px; text-align: left;" valign="top">
																												<div>
																													<p style="margin: 0;">
																														<span style="color: #222222;">Our team is cracking away at the chestnut that is the cannabis industry. </span>😆<br />
																														<span style="color: #222222;">We want {{contact.COMPANY|default:'your team' }} to have the biggest year of growth in 2024.</span><br />
																														We're <span style="color: rgb(34,34,34);">helping you do it with </span><span style="color: #222222;"><strong>easy, secure same-day delivery</strong></span>.</p>
																												</div>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																						<tr>
																							<td align="center" class="r8-c">
																								<table border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																									<tbody>
																										<tr>
																											<td class="r21-i" height="30" style="font-size: 30px; line-height: 30px; background-color: transparent;">
																												­</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																						<tr>
																							<td align="center" class="r1-c">
																								<table border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																									<tbody>
																										<tr>
																											<td align="left" class="r20-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px; text-align: left;" valign="top">
																												<div>
																													<p style="margin: 0;">
																														<span style="color: #222222;">We're excited to share what we're working on in the New Year! Our #1 goal is to make a positive difference for your dispensary and your customers by offering same-day delivery. Here's to a most prosperous and green new year. Cheers! </span>💚 🌿</p>
																												</div>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																						<tr>
																							<td align="center" class="r8-c">
																								<table border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																									<tbody>
																										<tr>
																											<td class="r21-i" height="30" style="font-size: 30px; line-height: 30px; background-color: transparent;">
																												­</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																						<tr>
																							<td class="r1-c" style="text-align: right; width: 100%; vertical-align: middle;">
																								<table border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed;">
																									<tbody>
																										<tr>
																											<td class="r22-i nl2go-default-textstyle" style="color: rgb(59, 63, 68); font-family: arial, helvetica, sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px; vertical-align: top; width: 100%; text-align: right;">
																												<div>
																													<p style="margin: 0; text-align: right;">
																														<i>Our team at Gras aspires to benefit our community by delivering cannabis as a public health service. We help businesses build lasting connections with patrons, and create a stronger local economy.</i><br />
																														We're <i>dedicated to your prosperity and driven by a burning desire for innovation. We are thankful to aid in your continued growth.</i></p>
																												</div>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																						<tr>
																							<td align="center" class="r8-c">
																								<table border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																									<tbody>
																										<tr>
																											<td class="r21-i" style="font-size: 30px; line-height: 30px; background-color: transparent; width: 100px; height: 30px;">
																												­</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																						<tr>
																							<td align="center" class="r1-c">
																								<table border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																									<tbody>
																										<tr>
																											<td align="left" class="r20-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px; text-align: left;" valign="top">
																												<div>
																													<p style="margin: 0; text-align: right;">
																														<span style="color: #4bbe6e; font-family: Arial; font-size: 18px;"><i><strong>All the best in business and health,</strong></i></span><br />
																														<span style="color: #4bbe6e; font-family: Arial; font-size: 18px;"><i><strong>Bryant Mejia, Gras</strong></i></span></p>
																												</div>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																					</tbody>
																				</table>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</th>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
								<table align="center" border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
									<tbody>
										<tr>
											<td class="r3-i" style="background-color: #fff2da; padding-bottom: 20px; padding-top: 20px;">
												<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
													<tbody>
														<tr>
															<th class="r4-c" style="font-weight: normal;" valign="top" width="100%">
																<table border="0" cellpadding="0" cellspacing="0" class="r5-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																	<tbody>
																		<tr>
																			<td class="r6-i" style="padding-left: 15px; padding-right: 15px;" valign="top">
																				<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																					<tbody>
																						<tr>
																							<td align="center" class="r8-c">
																								<table border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																									<tbody>
																										<tr>
																											<td class="r21-i" height="30" style="font-size: 30px; line-height: 30px; background-color: transparent;">
																												­</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																					</tbody>
																				</table>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</th>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
								<table align="center" border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
									<tbody>
										<tr>
											<td class="r23-i" style="background-color: #13622a; padding-bottom: 20px; padding-top: 20px;">
												<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
													<tbody>
														<tr>
															<th class="r4-c" style="background-color: #13622a; font-weight: normal;" valign="top" width="100%">
																<table border="0" cellpadding="0" cellspacing="0" class="r5-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																	<tbody>
																		<tr>
																			<td class="r24-i" style="background-color: #13622a; padding-left: 15px; padding-right: 15px;" valign="top">
																				<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
																					<tbody>
																						<tr>
																							<td align="left" class="r14-c">
																								<table border="0" cellpadding="0" cellspacing="0" class="r15-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																									<tbody>
																										<tr>
																											<td align="center" class="r25-i nl2go-default-textstyle" style="font-family: arial,helvetica,sans-serif; word-break: break-word; color: #3b3f44; font-size: 18px; line-height: 1.5; padding-top: 15px; text-align: center;" valign="top">
																												<div>
																													<p style="margin: 0;">
																														<span style="color: #fff2da;"><strong>Gras</strong></span></p>
																												</div>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																						<tr>
																							<td align="left" class="r14-c">
																								<table border="0" cellpadding="0" cellspacing="0" class="r15-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																									<tbody>
																										<tr>
																											<td align="center" class="r26-i nl2go-default-textstyle" style="font-family: arial,helvetica,sans-serif; word-break: break-word; color: #3b3f44; font-size: 18px; line-height: 1.5; text-align: center;" valign="top">
																												<div>
																													<p style="margin: 0; font-size: 14px;">
																														<span style="color: #fff2da;">832 Columbia Ave, 17603, Lancaster</span></p>
																												</div>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																						<tr>
																							<td align="left" class="r14-c">
																								<table border="0" cellpadding="0" cellspacing="0" class="r15-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																									<tbody>
																										<tr>
																											<td align="center" class="r25-i nl2go-default-textstyle" style="font-family: arial,helvetica,sans-serif; word-break: break-word; color: #3b3f44; font-size: 18px; line-height: 1.5; padding-top: 15px; text-align: center;" valign="top">
																												<div>
																													<p style="margin: 0; font-size: 14px;">
																														<span style="color: #fff2da;">This email was sent to </span>{{contact.EMAIL}}</p>
																												</div>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																						<tr>
																							<td align="left" class="r14-c">
																								<table border="0" cellpadding="0" cellspacing="0" class="r15-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																									<tbody>
																										<tr>
																											<td align="center" class="r26-i nl2go-default-textstyle" style="font-family: arial,helvetica,sans-serif; word-break: break-word; color: #3b3f44; font-size: 18px; line-height: 1.5; text-align: center;" valign="top">
																												<div>
																													<p style="margin: 0; font-size: 14px;">
																														<span style="color: #fff2da;">You've received it because you've subscribed to our newsletter.</span></p>
																												</div>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																						<tr>
																							<td align="left" class="r14-c">
																								<table border="0" cellpadding="0" cellspacing="0" class="r15-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																									<tbody>
																										<tr>
																											<td align="center" class="r27-i nl2go-default-textstyle" style="font-family: arial,helvetica,sans-serif; word-break: break-word; color: #3b3f44; font-size: 18px; line-height: 1.5; padding-bottom: 15px; padding-top: 15px; text-align: center;" valign="top">
																												<div>
																													<p style="margin: 0; font-size: 14px;">
																														<a href="{{ mirror }}" style="color: #14a33d; text-decoration: underline;"><span style="color: #fff2da;">View in browser</span></a><span style="color: #fff2da;"> | </span><a href="{{ unsubscribe }}" style="color: #14a33d; text-decoration: underline;"><span style="color: #fff2da;">Unsubscribe</span></a></p>
																												</div>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																						<tr>
																							<td align="center" class="r8-c">
																								<table align="center" border="0" cellpadding="0" cellspacing="0" class="r2-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
																									<tbody>
																										<tr>
																											<td class="r28-i" style="padding-bottom: 15px;" valign="top">
																												</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																					</tbody>
																				</table>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</th>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
<br />
</body></html>`;
}

export { buildNewsletterTemplate };

const articleMarkup = (content: {
	title: string;
	excerpt: string;
	mainImage: string;
	footer: string;
	link: string;
}) =>
	`<table align="center" border="0" cellpadding="0" cellspacing="0" class="r3-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
	<tbody>
		<tr>
			<td class="r4-i" style="padding-bottom: 20px; padding-top: 20px;">
				<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
					<tbody>
						<tr>
							<th class="r5-c" style="font-weight: normal;" valign="top" width="100%">
								<table border="0" cellpadding="0" cellspacing="0" class="r20-o" role="presentation" style="table-layout: fixed; width: 100%;" width="100%">
									<tbody>
										<tr>
											<td class="r7-i" style="padding-left: 15px; padding-right: 15px;" valign="top">
												<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
													<tbody>
														<tr>
															<td align="left" class="r21-c nl2go-default-textstyle" style="color: #3e3a3a; font-family: Arial; font-size: 18px; line-height: 1.5; word-break: break-word; padding-top: 15px; text-align: left; valign: top;">
																<h4 class="default-heading4" style="margin: 0; color: #3e3a3a; font-family: Tahoma; font-size: 18px; word-break: break-word;">${
																	content.title
																}</h4>
																</td>
															</tr>
															<tr>
																<td align="center" class="r22-c" style="font-size: 0px; line-height: 0px; padding-top: 15px; valign: top;">
																	<img src="${content.mainImage}" alt="${
		content.title
	}" style="display: block; width: 100%; border-width: 0px; border-style: solid;" /></td>
	</tr>
	<tr>
		<td align="left" class="r23-c nl2go-default-textstyle" style="color: #3e3a3a; font-family: Arial; font-size: 18px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px; text-align: left; valign: top;">
			<div>
				<p style="margin: 0;">${content.excerpt}<br />${
		(content.footer &&
			content.footer.replace(/here$/, `<a href="${content.link}">here</a>.`)) ||
		`More info available <a href="${content.link}">here</a>.`
	}</p>
	</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</th>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>`;
